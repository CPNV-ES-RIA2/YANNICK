import { useState, useEffect } from 'react'
import './styles/App.css'
import FileUpload from './components/FileUpload';
import { useLanguage } from './providers/languages';
import Languages from './components/Languages';
import Error from './components/Error';
import DataResult from './components/DataResult';
import { useError } from './providers/errors';


const API_URL_BUCKET = `${import.meta.env.VITE_BASE_URL}/api/upload`;
const API_URL_ANALYZE = `${import.meta.env.VITE_BASE_URL}/api/analyze`;
const API_URL_DOWNLOAD = `${import.meta.env.VITE_BASE_URL}/download`;

export default function App() {
  const [dataSource, setDataSource] = useState('');
  const [returnData, setReturnData] = useState();
  const [maxLabel, setMaxLabel] = useState(10);
  const [minConfidence, setMinConfidence] = useState(70);
  const { translations } = useLanguage();
  const { error, setError } = useError();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitAnalyze = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    if (e.target.potHonney.value) {
      setError({ message: 'errorPotHonney', success: false });
      setIsLoading(false);
      return;
    }

    if (e.target.maxLabel.value < 1 || e.target.maxLabel.value > 100) {
      setError({ message: 'errorMaxLabel', success: false });
      setIsLoading(false);
      return;
    }
    if (e.target.minConfidence.value < 1 || e.target.minConfidence.value > 100) {
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
    const formData = new FormData();
    formData.append('image', file);

    try {
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

      setError({ message: 'successFileUpload', success: true });

      const analysisResponse = await fetch(`${API_URL_ANALYZE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: uploadData.url,
          maxLabel: Number(maxLabel),
          minConfidence: Number(minConfidence)
        })
      });

      if (!analysisResponse.ok) {
        throw new Error('unavailable');
      }

      const analysisData = await analysisResponse.json();
      setReturnData({ ...analysisData.data, url: uploadData.url });

    } catch (err) {
      setError({ message: err.message || 'unavailable', success: false });
      setIsLoading(false);
    } finally {
      setMaxLabel(10);
      setMinConfidence(70);
      setDataSource('');
      setIsLoading(false);
    }

  }

  const handleDownloadSQL = async () => {
    try {
      const response = await fetch(`${API_URL_DOWNLOAD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: returnData.url })
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
        {returnData && (
          <>
            <DataResult dataResult={returnData} />
            <button onClick={() => handleDownloadSQL()} id="downloadSQL">{translations.downloadSQL}</button>
          </>
        )}
      </div>
    </div >
  )
}
