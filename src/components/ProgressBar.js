import './ProgressBar.css';

function ProgressBar({
    progress,
    label = '',
    color = '#4CAF50',
    height = 20,
    showPercentage = true,
    animated = false
}) {
    const normalizedProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className="progress-bar-container">
            {(label || showPercentage) && (
                <div className="progress-bar-header">
                    {label && <span className="progress-label">{label}</span>}
                    {showPercentage && (
                        <span className="progress-percentage">{normalizedProgress}%</span>
                    )}
                </div>
            )}

            <div
                className="progress-bar-outer"
                style={{
                    height: `${height}px`,
                    borderRadius: '20px',
                    overflow: 'visible'
                }}
            >
                <div
                    className={`progress-bar-inner ${animated ? 'animated' : ''}`}
                    data-progress={`${normalizedProgress}%`}
                    style={{
                        width: `${normalizedProgress}%`,
                        backgroundColor: color,
                        height: '100%',
                        transition: animated ? 'width 0.5s ease-in-out' : 'none',
                        borderRadius: '20px'
                    }}
                />
            </div>
        </div>
    );
}

export default ProgressBar;
