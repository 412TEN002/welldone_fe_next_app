type Props = {
  children: React.ReactNode;
  popup: React.ReactNode;
};

export default function TimerLayout({ children, popup }: Props) {
  return (
    <div>
      {children}
      {popup}
    </div>
  );
}
