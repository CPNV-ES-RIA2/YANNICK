export class Result {
    constructor(config) {
        this.labels = config.labels || [];
        this.numberOfLabel = config.numberOfLabel || 0;
        this.minConfidence = config.minConfidence || 0;
        this.averageConfidence = config.averageConfidence || 0;
    }
}

