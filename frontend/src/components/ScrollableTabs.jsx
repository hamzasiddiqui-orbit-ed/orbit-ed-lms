import React, { useState, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const ScrollableTabs = ({ reportData }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeTab, setActiveTab] = useState(Object.keys(reportData.parameters.derived)[0]);
  const tabListRef = useRef(null);

  const scroll = (direction) => {
    const container = tabListRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const derivedKeys = Object.keys(reportData.parameters.derived);
  const showScrollButtons = derivedKeys.length > 5;

  return (
    <div className="w-full">
      <div className="mb-8 relative">
        <div className="flex items-center">
          {showScrollButtons && (
            <button
              onClick={() => scroll('left')}
              className="z-10 bg-core p-2 mr-2"
              style={{ display: scrollPosition > 0 ? 'block' : 'none' }}
            >
              <IoIosArrowBack />
            </button>
          )}
          
          <div className="relative flex-grow overflow-hidden">
            <div 
              ref={tabListRef}
              className="tabs tabs-bordered whitespace-nowrap overflow-x-scroll scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
            >
              {derivedKeys.map((key) => (
                <a
                  key={key}
                  className={`tab ${activeTab === key ? 'tab-active' : ''}`}
                  onClick={() => handleTabClick(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              ))}
            </div>
          </div>
          
          {showScrollButtons && (
            <button
              onClick={() => scroll('right')}
              className="z-10 bg-core p-2 ml-2"
            >
              <IoIosArrowForward />
            </button>
          )}
        </div>

        <div className="tab-content p-10">
          <h3 className="text-lg font-semibold mb-4">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h3>
          <p>Content for {activeTab} goes here. You can add any components or data visualization related to {activeTab}.</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollableTabs;
