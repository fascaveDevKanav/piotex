import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu,  } from 'lucide-react';
import { AllCategories } from '@/lib/data';

const MegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [categoriesData, setCategoriesData] = useState([])
  const categories = [
    {
      id: 1,
      name: 'Kurtis',
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300&h=200&fit=crop',
      subcategories: ['Casual Kurtis', 'Party Wear', 'Work Wear', 'Printed Kurtis'],
    },
    {
      id: 2,
      name: 'Sarees',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=200&fit=crop',
      subcategories: ['Silk Sarees', 'Cotton Sarees', 'Designer Sarees', 'Wedding Sarees'],
    },
    {
      id: 3,
      name: 'Dresses',
      image: 'https://images.unsplash.com/photo-1566479179817-0fe8eed3e4e8?w=300&h=200&fit=crop',
      subcategories: ['Casual Dresses', 'Party Dresses', 'Maxi Dresses', 'Mini Dresses'],
    },
    {
      id: 4,
      name: 'Tops & Tunics',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop',
      subcategories: ['Crop Tops', 'Tunics', 'Blouses', 'Tank Tops'],
    },
    {
      id: 5,
      name: 'Bottoms',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=200&fit=crop',
      subcategories: ['Jeans', 'Leggings', 'Palazzo', 'Skirts'],
    },
    {
      id: 6,
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop',
      subcategories: ['Jewelry', 'Bags', 'Scarves', 'Belts'],
    },
    {
      id: 7,
      name: 'Footwear',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=200&fit=crop',
      subcategories: ['Heels', 'Flats', 'Sandals', 'Boots'],
    },
    {
      id: 8,
      name: 'Ethnic Wear',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&h=200&fit=crop',
      subcategories: ['Lehenga', 'Anarkali', 'Sharara', 'Palazzo Sets'],
    },
  ];

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
      src={`https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=200&fit=crop`}
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
