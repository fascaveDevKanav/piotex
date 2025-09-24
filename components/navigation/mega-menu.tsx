import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu,  } from 'lucide-react';
import { AllCategories } from '@/lib/data';

const MegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [categoriesData, setCategoriesData] = useState([])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(()=>{
   const fetchCategories = async () => {
    const data = await AllCategories();
    setCategoriesData(data?.categories);
   }
   fetchCategories()
  },[])
console.log(categoriesData,"catdata")
  return (
    <header >
  
            {/* All Categories Mega Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Menu className="h-4 w-4" />
                <span>All Categories</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl w-[800px] z-50 transition-all duration-200 ease-out opacity-100 scale-100">
                  <div className="p-6">
                    <div className="grid grid-cols-4 gap-6">
                      {categoriesData?.map((category: any) => (
                        <div key={category?.id} className="group cursor-pointer">
                       <div className="relative mb-3 overflow-hidden rounded-lg">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/${category?.image}`}
                          alt={category?.name}
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                               />
                              </div>

                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                            {category.name}
                          </h3>
                          
                        </div>
                      ))}
                    </div>
                
                  </div>
                </div>
              )}
            </div>    
    </header>
  );
};

export default MegaMenu;
