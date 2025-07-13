const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} India Wapsi. All rights reserved.</p>
        <p className="mt-1 text-xs">Helping NRIs reconnect with India.</p>
      </div>
    </footer>
  );
};

export default Footer;
