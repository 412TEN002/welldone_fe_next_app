type Props = {
  theme: "white" | "black";
};

export default function IconPlay({ theme }: Props) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 15.9996C30.0008 16.3392 29.9138 16.6732 29.7473 16.9691C29.5808 17.265 29.3406 17.5128 29.05 17.6884L11.04 28.7059C10.7364 28.8918 10.3886 28.9933 10.0326 28.9999C9.67661 29.0065 9.32532 28.918 9.015 28.7434C8.70764 28.5715 8.4516 28.3209 8.2732 28.0173C8.09481 27.7137 8.00051 27.368 8 27.0159V4.9834C8.00051 4.63125 8.09481 4.2856 8.2732 3.98199C8.4516 3.67837 8.70764 3.42775 9.015 3.2559C9.32532 3.08133 9.67661 2.99277 10.0326 2.99937C10.3886 3.00596 10.7364 3.10746 11.04 3.2934L29.05 14.3109C29.3406 14.4865 29.5808 14.7343 29.7473 15.0302C29.9138 15.3261 30.0008 15.6601 30 15.9996Z"
        fill={theme === "white" ? "#3C3731" : "white"}
      />
    </svg>
  );
}
