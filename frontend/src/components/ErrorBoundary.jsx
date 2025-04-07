import React from 'react'

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, info) {
        console.error(error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-red-600">Something went wrong.</h1>
                    <pre>{this.state.error?.toString()}</pre>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
