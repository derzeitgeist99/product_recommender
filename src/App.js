import React, { useState } from 'react';
import './App.css';

const PRODUCT_RECOMMENDATIONS = {
  'Mobile Phone': [
    { id: 1, name: 'iPhone 15 Pro', price: '$999', image: '📱', rating: 4.8, specs: ['6.1" Display', '5000mAh', '128GB'] },
    { id: 2, name: 'Samsung Galaxy S24', price: '$899', image: '📱', rating: 4.7, specs: ['6.2" Display', '4500mAh', '256GB'] },
    { id: 3, name: 'Google Pixel 8', price: '$699', image: '📱', rating: 4.6, specs: ['6.0" Display', '4000mAh', '128GB'] },
    { id: 4, name: 'OnePlus 12', price: '$799', image: '📱', rating: 4.5, specs: ['6.8" Display', '5400mAh', '256GB'] },
    { id: 5, name: 'Xiaomi 14 Ultra', price: '$649', image: '📱', rating: 4.4, specs: ['6.7" Display', '5300mAh', '512GB'] },
    { id: 6, name: 'iPhone 15', price: '$799', image: '📱', rating: 4.7, specs: ['6.1" Display', '3877mAh', '128GB'] }
  ],
  'Washing Machine': [
    { id: 1, name: 'LG WM3900HWA', price: '$899', image: '🧺', rating: 4.5, specs: ['4.5 cu ft', '5 Star', '12 Programs'] },
    { id: 2, name: 'Samsung WF45R6100', price: '$749', image: '🧺', rating: 4.3, specs: ['4.5 cu ft', '4 Star', '10 Programs'] },
    { id: 3, name: 'Whirlpool WTW7120HW', price: '$699', image: '🧺', rating: 4.4, specs: ['5.0 cu ft', '4 Star', '8 Programs'] },
    { id: 4, name: 'GE GFW650SSNWW', price: '$849', image: '🧺', rating: 4.2, specs: ['4.8 cu ft', '5 Star', '14 Programs'] },
    { id: 5, name: 'Maytag MVWC465HW', price: '$599', image: '🧺', rating: 4.1, specs: ['4.2 cu ft', '3 Star', '11 Programs'] },
    { id: 6, name: 'Bosch WAW285H2UC', price: '$1299', image: '🧺', rating: 4.6, specs: ['2.2 cu ft', '5 Star', '15 Programs'] }
  ],
  'Mobile Charger': [
    { id: 1, name: 'Anker PowerPort III', price: '$39', image: '🔌', rating: 4.7, specs: ['65W', '3 Ports', 'USB-C'] },
    { id: 2, name: 'Belkin 3-in-1 Wireless', price: '$149', image: '🔌', rating: 4.5, specs: ['15W Wireless', '2 Ports', 'MagSafe'] },
    { id: 3, name: 'UGREEN Nexode 100W', price: '$79', image: '🔌', rating: 4.6, specs: ['100W', '4 Ports', 'GaN Tech'] },
    { id: 4, name: 'Apple MagSafe Charger', price: '$39', image: '🔌', rating: 4.4, specs: ['15W Wireless', '1 Port', 'MagSafe'] },
    { id: 5, name: 'RAVPower 65W GaN', price: '$49', image: '🔌', rating: 4.3, specs: ['65W', '2 Ports', 'Compact'] },
    { id: 6, name: 'Aukey Omnia 100W', price: '$69', image: '🔌', rating: 4.5, specs: ['100W', '4 Ports', 'PD 3.0'] }
  ]
};

const PRODUCTS = {
  'Mobile Phone': [
    { id: 1, feature: 'Screen Size', type: 'slider', min: 5.0, max: 7.0, step: 0.1, unit: 'inches', defaultValue: 6.1, explanation: 'Larger screens are great for videos and gaming, but make the phone bulkier and harder to use with one hand.' },
    { id: 2, feature: 'Battery Size', type: 'slider', min: 2000, max: 6000, step: 100, unit: 'mAh', defaultValue: 4000, explanation: 'Higher capacity means longer usage time, but increases phone weight and thickness.' },
    { id: 3, feature: 'Operating System', type: 'select', options: ['Android 14', 'iOS 17', 'Android 13', 'iOS 16'], defaultValue: 'Android 14', explanation: 'iOS offers seamless Apple ecosystem integration, while Android provides more customization and app flexibility.' },
    { id: 4, feature: 'Camera Quality', type: 'slider', min: 12, max: 200, step: 1, unit: 'MP', defaultValue: 50, explanation: 'Higher megapixels capture more detail for photos, but use more storage space and processing power.' },
    { id: 5, feature: 'Storage Space', type: 'select', options: ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'], defaultValue: '256 GB', explanation: 'More storage allows for more apps, photos, and videos, but significantly increases the price.' },
    { id: 6, feature: 'RAM', type: 'slider', min: 4, max: 16, step: 1, unit: 'GB', defaultValue: 8, explanation: 'More RAM enables smoother multitasking and faster app switching, but drains battery faster.' },
    { id: 7, feature: 'Processor Speed', type: 'select', options: ['Snapdragon 8 Gen 3', 'A17 Pro', 'Snapdragon 8 Gen 2', 'MediaTek Dimensity 9300'], defaultValue: 'Snapdragon 8 Gen 3', explanation: 'Faster processors improve gaming and app performance, but may generate more heat and use more battery.' },
    { id: 8, feature: 'Water Resistance', type: 'checkbox', options: ['IP68', 'IP67', 'IP65', 'No Rating'], defaultValue: ['IP68'], explanation: 'Higher ratings protect against water damage during accidents, but may require thicker seals affecting design.' }
  ],
  'Washing Machine': [
    { id: 1, feature: 'Load Capacity', type: 'slider', min: 5, max: 15, step: 0.5, unit: 'kg', defaultValue: 8, explanation: 'Larger capacity handles more clothes per load, saving time and energy, but requires more space and costs more.' },
    { id: 2, feature: 'Energy Rating', type: 'select', options: ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star'], defaultValue: '5 Star', explanation: 'Higher ratings significantly reduce electricity bills over time, but machines cost more upfront.' },
    { id: 3, feature: 'Wash Programs', type: 'slider', min: 5, max: 20, step: 1, unit: 'programs', defaultValue: 12, explanation: 'More programs provide better care for different fabric types, but can make the interface more complex to use.' },
    { id: 4, feature: 'Spin Speed', type: 'slider', min: 800, max: 1600, step: 100, unit: 'RPM', defaultValue: 1200, explanation: 'Higher spin speeds remove more water, reducing drying time, but may cause more wrinkles and wear on clothes.' },
    { id: 5, feature: 'Smart Features', type: 'checkbox', options: ['WiFi Control', 'App Integration', 'Voice Control', 'Auto Detergent'], defaultValue: ['WiFi Control'], explanation: 'Smart features offer convenience and remote monitoring, but add complexity and potential technical issues.' },
    { id: 6, feature: 'Quick Wash', type: 'slider', min: 10, max: 60, step: 5, unit: 'minutes', defaultValue: 15, explanation: 'Faster cycles save time for lightly soiled items, but may not clean heavily soiled clothes as effectively.' },
    { id: 7, feature: 'Steam Function', type: 'checkbox', options: ['Steam Cleaning', 'Steam Refresh', 'Allergy Care'], defaultValue: ['Steam Cleaning'], explanation: 'Steam reduces wrinkles and sanitizes clothes, but uses more water and energy per cycle.' },
    { id: 8, feature: 'Child Lock', type: 'checkbox', options: ['Control Lock', 'Door Lock', 'Display Lock'], defaultValue: ['Control Lock'], explanation: 'Safety locks prevent accidents with children around, but can be inconvenient when you need quick access.' }
  ],
  'Mobile Charger': [
    { id: 1, feature: 'Charging Speed', type: 'slider', min: 10, max: 100, step: 5, unit: 'W', defaultValue: 65, explanation: 'Higher wattage charges devices much faster, but generates more heat and may reduce battery lifespan over time.' },
    { id: 2, feature: 'Cable Length', type: 'slider', min: 0.5, max: 3.0, step: 0.5, unit: 'meters', defaultValue: 2.0, explanation: 'Longer cables offer more flexibility in placement, but may be bulkier to carry and have slightly slower charging.' },
    { id: 3, feature: 'Port Count', type: 'slider', min: 1, max: 6, step: 1, unit: 'ports', defaultValue: 3, explanation: 'More ports allow charging multiple devices simultaneously, but increase size, weight, and cost.' },
    { id: 4, feature: 'Safety Features', type: 'checkbox', options: ['Overcharge Protection', 'Short Circuit Protection', 'Temperature Control', 'Surge Protection'], defaultValue: ['Overcharge Protection'], explanation: 'Safety features protect your devices from damage, but add cost and may slightly reduce charging efficiency.' },
    { id: 5, feature: 'Compatibility', type: 'checkbox', options: ['USB-C', 'Lightning', 'Micro USB', 'Qi Wireless'], defaultValue: ['USB-C'], explanation: 'More connector types work with more devices, but increase charger complexity and cost.' },
    { id: 6, feature: 'Size & Weight', type: 'select', options: ['Ultra Compact', 'Compact', 'Standard', 'Large'], defaultValue: 'Compact', explanation: 'Smaller chargers are more portable, but typically offer lower power output and fewer ports.' },
    { id: 7, feature: 'Wireless Charging', type: 'slider', min: 0, max: 25, step: 5, unit: 'W', defaultValue: 15, explanation: 'Wireless charging adds convenience, but is less efficient than wired charging and generates more heat.' },
    { id: 8, feature: 'LED Indicator', type: 'checkbox', options: ['Charging Status', 'Power Status', 'Error Indicator'], defaultValue: ['Charging Status'], explanation: 'LED indicators provide useful status information, but may be distracting in dark environments.' }
  ]
};

// Function to shuffle array randomly - moved outside component to avoid initialization issues
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('features');
  const [selectedProduct, setSelectedProduct] = useState('Mobile Phone');
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [categorizedFeatures, setCategorizedFeatures] = useState({
    important: [],
    notImportant: [],
    dontCare: []
  });
  const [animatingFeature, setAnimatingFeature] = useState(null);
  const [swipeOrder, setSwipeOrder] = useState(0); // Track order of swipes
  const [selectedFeatureDetail, setSelectedFeatureDetail] = useState(null);
  const [featureValues, setFeatureValues] = useState({}); // Store user's feature preferences
  const [shuffledProducts, setShuffledProducts] = useState(() => {
    return shuffleArray(PRODUCT_RECOMMENDATIONS['Mobile Phone'] || []);
  });
  const [searchQuery, setSearchQuery] = useState('Mobile Phone');

  // Function to reshuffle products
  const reshuffleProducts = () => {
    if (selectedProduct && PRODUCT_RECOMMENDATIONS[selectedProduct]) {
      const shuffled = shuffleArray(PRODUCT_RECOMMENDATIONS[selectedProduct]);
      setShuffledProducts(shuffled);
    }
  };

  // Function to handle search and product change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    
    // Check if the query matches any existing product
    const matchedProduct = Object.keys(PRODUCTS).find(
      product => product.toLowerCase().includes(query.toLowerCase())
    );
    
    if (matchedProduct && matchedProduct !== selectedProduct) {
      setSelectedProduct(matchedProduct);
      setCurrentFeatureIndex(0);
      setCategorizedFeatures({ important: [], notImportant: [], dontCare: [] });
      setSwipeOrder(0);
      setFeatureValues({});
      
      // Initialize shuffled products for new category
      if (PRODUCT_RECOMMENDATIONS[matchedProduct]) {
        const shuffled = shuffleArray(PRODUCT_RECOMMENDATIONS[matchedProduct]);
        setShuffledProducts(shuffled);
      }
    }
  };


  const handleSwipe = (direction) => {
    const currentFeature = PRODUCTS[selectedProduct][currentFeatureIndex];
    
    // Start animation
    setAnimatingFeature({ 
      feature: currentFeature, 
      direction: direction,
      startTime: Date.now()
    });

    // Add swipe order to the feature
    const featureWithOrder = { ...currentFeature, swipeOrder: swipeOrder };

    // Update categorized features immediately for the preview
    const newCategorized = { ...categorizedFeatures };
    if (direction === 'left') {
      newCategorized.important.push(featureWithOrder);
    } else if (direction === 'right') {
      newCategorized.notImportant.push(featureWithOrder);
    } else if (direction === 'down') {
      newCategorized.dontCare.push(featureWithOrder);
    }
    setCategorizedFeatures(newCategorized);
    setSwipeOrder(swipeOrder + 1); // Increment swipe order

    // Reshuffle products after each swipe
    reshuffleProducts();

    // Wait for animation to complete before moving to next feature
    setTimeout(() => {
      setAnimatingFeature(null);
      if (currentFeatureIndex < PRODUCTS[selectedProduct].length - 1) {
        setCurrentFeatureIndex(currentFeatureIndex + 1);
      } else {
        // Stay on the current screen after all features are evaluated
        // Don't navigate to results screen
      }
    }, 100); // Very fast transition for all swipes
  };

  const handleFeatureClick = (feature) => {
    setSelectedFeatureDetail(feature);
  };

  const closeFeatureDetail = () => {
    setSelectedFeatureDetail(null);
  };

  const updateFeatureValue = (featureId, value) => {
    setFeatureValues(prev => ({
      ...prev,
      [featureId]: value
    }));
    // Reshuffle products after feature value update
    reshuffleProducts();
  };

  const resetApp = () => {
    setCurrentScreen('selection');
    setSelectedProduct(null);
    setCurrentFeatureIndex(0);
    setCategorizedFeatures({ important: [], notImportant: [], dontCare: [] });
    setAnimatingFeature(null);
    setSwipeOrder(0);
    setSelectedFeatureDetail(null);
    setFeatureValues({});
    setShuffledProducts([]);
  };


  if (currentScreen === 'features') {
    const currentFeature = PRODUCTS[selectedProduct][currentFeatureIndex];

    return (
      <div className="App">
        <div className="features-screen">
          <div className="app-header-small">
            <img 
              className="app-logo-small" 
              src="https://cdn.heureka.group/fe/hasty-images/latest/brand/heureka-cz/logo.svg" 
              alt="Heureka.cz — Vybírejte úžasně!"
            />
            <h3 className="app-title-small">Shopping Assistant</h3>
            <input
              type="text"
              placeholder="Search product..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="search-field"
              list="product-categories"
            />
            <datalist id="product-categories">
              {Object.keys(PRODUCTS).map((product) => (
                <option key={product} value={product} />
              ))}
            </datalist>
          </div>
          <div className="header">
            <h2>{selectedProduct}</h2>
          </div>

          {/* Show current feature card only if not animating or show animating card */}
          {!animatingFeature && (
            <FeatureCard
              feature={currentFeature}
              onSwipe={handleSwipe}
              onFeatureClick={handleFeatureClick}
            />
          )}

          {/* Show animating feature card */}
          {animatingFeature && (
            <FeatureCard
              feature={animatingFeature.feature}
              onSwipe={handleSwipe}
              onFeatureClick={handleFeatureClick}
              isAnimating={true}
              animationDirection={animatingFeature.direction}
            />
          )}

          <div className="swipe-instructions">
            <div className="instruction">
              <span className="arrow">←</span>
              <span>Important</span>
            </div>
            <div className="instruction">
              <span className="arrow">→</span>
              <span>Not Important</span>
            </div>
            <div className="instruction">
              <span className="arrow">↓</span>
              <span>Don't Care</span>
            </div>
            <div className="instruction">
              <span className="arrow">👆</span>
              <span>Tap to set value</span>
            </div>
          </div>

          <div className="categorized-preview">
            <div className="category important">
              <h4>Important</h4>
              <div className="mini-features">
                {categorizedFeatures.important
                  .sort((a, b) => a.swipeOrder - b.swipeOrder)
                  .map((feature) => (
                    <div 
                      key={`${feature.id}-${feature.swipeOrder}`} 
                      className="mini-feature clickable"
                      onClick={() => handleFeatureClick(feature)}
                    >
                      {feature.feature}
                    </div>
                  ))}
              </div>
            </div>
            <div className="category dont-care">
              <h4>Don't Care</h4>
              <div className="mini-features">
                {categorizedFeatures.dontCare
                  .sort((a, b) => a.swipeOrder - b.swipeOrder)
                  .map((feature) => (
                    <div 
                      key={`${feature.id}-${feature.swipeOrder}`} 
                      className="mini-feature dont-care clickable"
                      onClick={() => handleFeatureClick(feature)}
                    >
                      {feature.feature}
                    </div>
                  ))}
              </div>
            </div>
            <div className="category not-important">
              <h4>Not Important</h4>
              <div className="mini-features">
                {categorizedFeatures.notImportant
                  .sort((a, b) => a.swipeOrder - b.swipeOrder)
                  .map((feature) => (
                    <div 
                      key={`${feature.id}-${feature.swipeOrder}`} 
                      className="mini-feature not-important clickable"
                      onClick={() => handleFeatureClick(feature)}
                    >
                      {feature.feature}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Feature Detail Modal */}
          {selectedFeatureDetail && (
            <FeatureDetailModal 
              feature={selectedFeatureDetail}
              currentValue={featureValues[selectedFeatureDetail.id] || selectedFeatureDetail.defaultValue}
              onValueChange={(value) => updateFeatureValue(selectedFeatureDetail.id, value)}
              onClose={closeFeatureDetail}
            />
          )}

          {/* Product Recommendations */}
          <div className="product-recommendations">
            <h3>Recommended {selectedProduct}s</h3>
            <div className="product-grid">
              {shuffledProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'results') {
    return (
      <div className="App">
        <div className="results-screen">
          <h2>Your {selectedProduct} Preferences</h2>
          
          <div className="results-categories">
            <div className="result-category important">
              <h3>Important Features</h3>
              {categorizedFeatures.important.map((feature) => (
                <div key={feature.id} className="feature-item">
                  <strong>{feature.feature}</strong>
                </div>
              ))}
            </div>

            <div className="result-category not-important">
              <h3>Not Important Features</h3>
              {categorizedFeatures.notImportant.map((feature) => (
                <div key={feature.id} className="feature-item">
                  <strong>{feature.feature}</strong>
                </div>
              ))}
            </div>

            <div className="result-category dont-care">
              <h3>Don't Care Features</h3>
              {categorizedFeatures.dontCare.map((feature) => (
                <div key={feature.id} className="feature-item">
                  <strong>{feature.feature}</strong>
                </div>
              ))}
            </div>
          </div>

          <button className="reset-button" onClick={resetApp}>
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <span className="product-emoji">{product.image}</span>
      </div>
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <div className="product-price">{product.price}</div>
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="rating-number">{product.rating}</span>
        </div>
        <div className="product-specs">
          {product.specs.map((spec, index) => (
            <span key={index} className="spec-tag">{spec}</span>
          ))}
        </div>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
}

function FeatureDetailModal({ feature, currentValue, onValueChange, onClose }) {
  const [value, setValue] = useState(currentValue);

  const handleSave = () => {
    onValueChange(value);
    onClose();
  };

  const renderControl = () => {
    switch (feature.type) {
      case 'slider':
        return (
          <div className="control-group">
            <label>Value: {value} {feature.unit}</label>
            <input
              type="range"
              min={feature.min}
              max={feature.max}
              step={feature.step}
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              className="slider"
            />
            <div className="slider-range">
              <span>{feature.min} {feature.unit}</span>
              <span>{feature.max} {feature.unit}</span>
            </div>
          </div>
        );
      
      case 'select':
        return (
          <div className="control-group">
            <label>Select Option:</label>
            <select 
              value={value} 
              onChange={(e) => setValue(e.target.value)}
              className="select-dropdown"
            >
              {feature.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      
      case 'checkbox':
        const selectedOptions = Array.isArray(value) ? value : [value];
        return (
          <div className="control-group">
            <label>Select Options:</label>
            <div className="checkbox-group">
              {feature.options.map((option) => (
                <label key={option} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setValue([...selectedOptions, option]);
                      } else {
                        setValue(selectedOptions.filter(o => o !== option));
                      }
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      
      default:
        return <div>Unknown feature type</div>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{feature.feature}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {feature.explanation && (
            <div className="feature-explanation">
              <p>{feature.explanation}</p>
            </div>
          )}
          {renderControl()}
        </div>
        <div className="modal-footer">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ feature, onSwipe, onFeatureClick, isAnimating = false, animationDirection = null }) {
  const [startTouch, setStartTouch] = useState(null);
  const [currentTransform, setCurrentTransform] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    if (isAnimating) return; // Don't allow interaction during animation
    e.preventDefault();
    const touch = e.touches[0];
    setStartTouch({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
    setIsDragging(true);
    setCurrentTransform({ x: 0, y: 0 });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!startTouch || !isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startTouch.x;
    const deltaY = touch.clientY - startTouch.y;
    
    // Apply some damping to make it feel natural
    setCurrentTransform({ 
      x: deltaX * 0.8, 
      y: deltaY * 0.8 
    });
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    if (!startTouch || !isDragging) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startTouch.x;
    const deltaY = touch.clientY - startTouch.y;
    const deltaTime = Date.now() - startTouch.time;

    const threshold = 80;
    const maxTime = 500;

    // Check if it's a valid swipe
    if (deltaTime < maxTime) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > threshold) {
          const direction = deltaX > 0 ? 'right' : 'left';
          onSwipe(direction);
        } else if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
          // Small movement, treat as tap
          onFeatureClick && onFeatureClick(feature);
        }
      } else {
        // Vertical swipe
        if (deltaY > threshold) {
          onSwipe('down');
        } else if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
          // Small movement, treat as tap
          onFeatureClick && onFeatureClick(feature);
        }
      }
    } else if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
      // Long press or tap with minimal movement
      onFeatureClick && onFeatureClick(feature);
    }

    // Reset state
    setStartTouch(null);
    setCurrentTransform({ x: 0, y: 0 });
    setIsDragging(false);
  };

  // Add mouse events for desktop testing
  const handleMouseDown = (e) => {
    if (isAnimating) return; // Don't allow interaction during animation
    setStartTouch({
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    });
    setIsDragging(true);
    setCurrentTransform({ x: 0, y: 0 });
  };

  const handleMouseMove = (e) => {
    if (!startTouch || !isDragging) return;
    
    const deltaX = e.clientX - startTouch.x;
    const deltaY = e.clientY - startTouch.y;
    
    setCurrentTransform({ 
      x: deltaX * 0.8, 
      y: deltaY * 0.8 
    });
  };

  const handleMouseUp = (e) => {
    if (!startTouch || !isDragging) return;

    const deltaX = e.clientX - startTouch.x;
    const deltaY = e.clientY - startTouch.y;
    const deltaTime = Date.now() - startTouch.time;

    const threshold = 80;
    const maxTime = 500;

    if (deltaTime < maxTime) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0) {
            onSwipe('right');
          } else {
            onSwipe('left');
          }
        } else if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
          // Small movement, treat as click
          onFeatureClick && onFeatureClick(feature);
        }
      } else {
        if (deltaY > threshold) {
          onSwipe('down');
        } else if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
          // Small movement, treat as click
          onFeatureClick && onFeatureClick(feature);
        }
      }
    } else if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
      // Long press or click with minimal movement
      onFeatureClick && onFeatureClick(feature);
    }

    setStartTouch(null);
    setCurrentTransform({ x: 0, y: 0 });
    setIsDragging(false);
  };

  // Get swipe direction for visual feedback
  const getSwipeDirection = () => {
    const { x, y } = currentTransform;
    if (Math.abs(x) > Math.abs(y)) {
      if (x > 50) return 'right';
      if (x < -50) return 'left';
    } else if (y > 50) {
      return 'down';
    }
    return null;
  };

  const swipeDirection = getSwipeDirection();

  // Get animation classes and styles
  const getAnimationStyles = () => {
    if (!isAnimating) return {};
    
    // All swipes: just fade out quickly, no movement
    return {
      opacity: 0,
      transition: 'opacity 0.3s ease-out'
    };
  };

  const animationStyles = getAnimationStyles();

  return (
    <div 
      className={`feature-card ${isDragging ? 'dragging' : ''} ${swipeDirection ? `swipe-${swipeDirection}` : ''} ${isAnimating ? `animating-${animationDirection}` : ''}`}
      style={{
        ...animationStyles,
        ...(isAnimating ? {} : {
          transform: `translate(${currentTransform.x}px, ${currentTransform.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease',
          opacity: isDragging && swipeDirection ? 0.8 : 1
        })
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h3>{feature.feature}</h3>
      {feature.explanation && (
        <p className="feature-card-explanation">{feature.explanation}</p>
      )}
      {isDragging && swipeDirection && !isAnimating && (
        <div className="swipe-indicator">
          {swipeDirection === 'left' && '👍 Important'}
          {swipeDirection === 'right' && '👎 Not Important'}
          {swipeDirection === 'down' && '🤷 Don\'t Care'}
        </div>
      )}
    </div>
  );
}

export default App;
