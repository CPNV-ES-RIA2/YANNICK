import { useState } from 'react'
import './styles/App.css'
import FileUpload from './components/FileUpload';
import { useLanguage } from './providers/languages';
import Languages from './components/Languages';
import Error from './components/Error';
import DataResult from './components/DataResult';
import { useError } from './providers/errors';
import { useResults } from './providers/results';


const API_URL_BUCKET = `${import.meta.env.VITE_DATAOBJECT_BASE_URL}/api/upload`;
const API_URL_ANALYZE = `${import.meta.env.VITE_LABELDETECTOR_BASE_URL}/api/analyze`;
const API_URL_DOWNLOAD = `${import.meta.env.VITE_LABELDETECTOR_BASE_URL}/download`;

export default function App() {
  const [dataSource, setDataSource] = useState('');
  const [maxLabel, setMaxLabel] = useState(10);
  const [minConfidence, setMinConfidence] = useState(70);

  const { results, setResults, setIsLoading, isLoading } = useResults();

  const { translations } = useLanguage();
  const { error, setError } = useError();

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const uploadResponse = await fetch(`${API_URL_BUCKET}`, {
      method: 'POST',
      body: formData
    });

    if (!uploadResponse.ok) {
      throw new Error('unavailable');
    }

    const uploadData = await uploadResponse.json();
    if (uploadData.status === 500 || uploadData.status === 404) {
      throw new Error('errorFileUpload');
    }

    return uploadData.url;
  };

  const analyzeImage = async (imageUrl) => {

    const analysisResponse = await fetch(`${API_URL_ANALYZE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: imageUrl,
        maxLabel: Number(maxLabel),
        minConfidence: Number(minConfidence)
      })
    });

    if (!analysisResponse.ok) {
      throw new Error('unavailable');
    }

    const resultAnalysis = await analysisResponse.json();

    // Update the results state with the data from the analysis
    setResults({ ...resultAnalysis.data, url: imageUrl });

    return resultAnalysis
  };;

  const handleSubmitAnalyze = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (e.target.potHonney.value) {
        setError({ message: 'errorPotHonney', success: false });
        setIsLoading(false);
        return;
      }
      // Validate input fields and file selection
      if (e.target.maxLabel.value < 1 || e.target.maxLabel.value > 100) {
        // Set error based on the failed validation
        setError({ message: 'errorMaxLabel', success: false });
        setIsLoading(false);
        return;
      }

      if (e.target.minConfidence.value < 0 || e.target.minConfidence.value > 100) {
        setError({ message: 'errorMinConfidence', success: false });
        setIsLoading(false);
        return;
      }

      const file = dataSource[0];
      if (!file) {
        setError({ message: 'errorFileUpload', success: false });
        setIsLoading(false);
        return;
      }

      // Upload the image and analyze it
      const imageUrl = await uploadImage(file);
      const analysisData = await analyzeImage(imageUrl);

      if (analysisData.status === 500 || analysisData.status === 404) {
        throw new Error('errorFileUpload');
      }
      // Set the success message
      setError({ message: 'successFileUpload', success: true });

    } catch (err) {
      setError({ message: err.message || 'unavailable', success: false });
    } finally {
      setMaxLabel(10);
      setMinConfidence(70);
      setDataSource('');
      setIsLoading(false);
    }
  };

  const handleDownloadSQL = async () => {
    try {
      const response = await fetch(`${API_URL_DOWNLOAD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: results.url })
      });

      if (!response.ok) {
        throw new Error('unavailable');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'insert.sql');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError({ message: err.message, success: false });
    }
  };

  const handleUploadedFiles = (files) => {
    setDataSource(files);
  };

  return (
    <div>
      <Error message={error.message} success={error.success} />

      <Languages />

      <form onSubmit={handleSubmitAnalyze} encType="multipart/form-data" id='formDataInput'>
        <h1>{translations.title}</h1>
        <p>{translations.description}</p>
        <label htmlFor="dataSource">{translations.dataSource}</label>
        <br />
        <FileUpload handleUploadedFiles={handleUploadedFiles} />
        <label htmlFor="maxLabel">{translations.maxLabel}</label>
        <input type="number" name="maxLabel" id="maxLabel" value={maxLabel} onChange={(e) => setMaxLabel(e.target.value)} />
        <label htmlFor="minConfidence">{translations.minConfidence}</label>
        <input type="number" name="minConfidence" id="minConfidence" value={minConfidence} onChange={(e) => setMinConfidence(e.target.value)} onError={(e) => setError({ message: 'errorMinConfidence', success: false })} />
        <br />
        <input type="hidden" id="potHonney" />
        <button id="analyzeButton">{translations.analyze}</button>
      </form>

      <div>
        {isLoading && <div>{translations.loading}</div>}
        {results && Object.keys(results).length > 0 && (
          <>
            <DataResult dataResult={results} />
            <button onClick={() => handleDownloadSQL()} id="downloadSQL">{translations.downloadSQL}</button>
          </>
        )}
      </div>
    </div >
  )
}
