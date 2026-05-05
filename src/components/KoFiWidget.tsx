interface KoFiWidgetProps {
  className?: string;
}

export default function KoFiWidget({ className = '' }: KoFiWidgetProps) {
  return (
    <a
      href="https://ko-fi.com/J3J71YZHHS"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <img
        height="36"
        style={{ border: '0px', height: '36px' }}
        src="https://storage.ko-fi.com/cdn/kofi3.png?v=6"
        alt="Buy Me a Coffee at ko-fi.com"
        referrerPolicy="no-referrer"
      />
    </a>
  );
}
