export default function Footer() {
  return (
    <footer className="w-full bg-black border-t py-4 px-6 text-center text-sm text-white">
      <p>&copy; PakePrompt {new Date().getFullYear()}</p>
    </footer>
  );
}
