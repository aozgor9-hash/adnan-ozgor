import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Hata olunca yerine gösterilecek içerik (varsayılan: hiçbir şey) */
  fallback?: ReactNode;
  onError?: (error: unknown) => void;
};

/**
 * Bir bölüm hata verirse sadece o bölüm kaybolur; sayfanın geri kalanı açık kalır.
 * Böylece ziyaretçi hiçbir koşulda bomboş bir ekranla karşılaşmaz.
 */
export default class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error('[portfolyo] bölüm hatası', error, info.componentStack);
    this.props.onError?.(error);
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
