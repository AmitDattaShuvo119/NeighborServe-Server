
const FeatureCard = ({ title, description }) => {
    return (
      <div className="feature-card p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };
  
  const PricingSection = () => {
    return (
        <section className="pricing-section bg-gradient-to-r from-blue-500 to-purple-500 py-16 mb-5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl text-white font-bold mb-8">Choose Your Plan</h2>
  
         
          <div className="flex justify-center space-x-8 mb-12">
            <FeatureCard title="Feature 1" description="Lorem ipsum dolor sit amet." />
            <FeatureCard title="Feature 2" description="Consectetur adipiscing elit." />
            <FeatureCard title="Feature 3" description="Sed do eiusmod tempor incididunt." />
          </div>
  
       
          <div className="flex justify-center space-x-7">
           
            <div className="pricing-card paid-plan bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-3">Paid Plan</h3>
              <p className="text-gray-600 mb-6">Unlock premium features for just $9.99/month</p>
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default PricingSection;