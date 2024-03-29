import styles from './Preloader.module.css'

export const Preloader = ({ className, ...props }) => (
   <svg
      className={`${styles.preloader} ${className ? className : ''}`}
      version="1.0"
      width="40px"
      height="40px"
      viewBox="0 0 128 128"
   >
      <g>
         <linearGradient id="linear-gradient">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#000000" />
         </linearGradient>
         <path
            d="M63.85 0A63.85 63.85 0 1 1 0 63.85 63.85 63.85 0 0 1 63.85 0zm.65 19.5a44 44 0 1 1-44 44 44 44 0 0 1 44-44z"
            fill="url(#linear-gradient)"
            fillRule="evenodd"
         />
         <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 64 64"
            to="360 64 64"
            dur="240ms"
            repeatCount="indefinite"
         ></animateTransform>
      </g>
   </svg>
)
