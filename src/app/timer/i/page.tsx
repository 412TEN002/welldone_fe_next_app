import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Link href="/timer/i/end">end</Link>
      <Link href="/timer/i/feedback">feedback</Link>
      <Link href="/timer/i/review">review</Link>
    </div>
  );
}
