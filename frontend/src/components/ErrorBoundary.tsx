import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Log error silently for monitoring
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] w-full flex items-center justify-center p-6 text-center">
          <div className="glass-card-premium p-10 max-w-lg w-full border border-white/10 shadow-2xl">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-wide">
              Something Went Wrong
            </h2>
            <p className="text-silver mb-8 text-sm leading-relaxed">
              We encountered a temporary rendering issue. Don't worry, your data is safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-primary-gold text-background font-bold px-6 py-3 rounded-full hover:bg-secondary-gold transition-colors shadow-lg"
              >
                Reload Page
              </button>
              <a
                href="/"
                className="bg-glass-card text-white font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors border border-white/10"
              >
                Return Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
