const Navbar = () => {
    return (
      <nav className="flex justify-between items-center py-4 px-6 bg-gray-900 text-white">
        <div className="text-xl font-bold">RiseCred</div>
        <div className="space-x-6">
          <a href="#how-it-works" className="hover:text-yellow-500">How It Works</a>
          <a href="#usps" className="hover:text-yellow-500">USPs</a>
          <a href="#salient-features" className="hover:text-yellow-500">Features</a>
          <a href="#cta" className="bg-yellow-500 px-4 py-2 rounded text-black">Experience RiseCred</a>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  