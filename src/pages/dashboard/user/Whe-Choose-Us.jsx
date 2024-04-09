import React from "react";
import logo from "../../../../public/logo.png";

const WhyChooseus = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-20 py-8 px-4 lg:py-16 lg:px-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl tracking-tight font-bold text-primary-800 text-center">
          Why Choose <span className="text-green">Us</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="mr-0 md:mr-8 mb-6 md:mb-0">
          <img className="h-96 w-96" src="/logo.png" alt="" />
        </div>

        <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
          <div className="w-full sm:w-1/2 mb-4 px-2 ">
            <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 className="text-2xl font-bold text-md mb-6">
                Dynamic Personalization:
              </h3>
              <p className="text-sm">
                Upon entering the buffet, customers could be greeted with
                personalized menu suggestions based on their past dining history
                or preferences. For example, if a customer has previously
                enjoyed vegetarian dishes, the system could recommend similar
                options.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 mb-4 px-2 ">
            <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 className="text-2xl font-bold text-md mb-6">
                Mobile-Optimized Interface
              </h3>
              <p className="text-sm">
                The interface is designed to adapt to different screen sizes,
                ensuring that it looks and functions well on various mobile
                devices, including smartphones and tablets. Intuitive
                Navigation: The navigation menu is optimized for touch
                interactions, with easy-to-access buttons and menus that allow
                users to navigate the app effortlessly.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-1/2 mb-4 px-2 ">
            <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 className="text-2xl font-bold text-md mb-6">
                24/7 Customer Support
              </h3>
              <p className="text-sm">
                Experience Royalties Buffet's unparalleled commitment to
                customer satisfaction with our 24/7 support service. Whether
                you're dining with us during the early morning hours or late
                into the night, our dedicated support team is here to ensure
                your experience is nothing short of exceptional. From addressing
                any inquiries or concerns to providing recommendations on our
                extensive menu offerings, we're available around the clock to
                cater to your needs. Enjoy peace of mind knowing that Royalties
                Buffet is committed to delivering outstanding service whenever
                you choose to dine with us.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-1/2 mb-4 px-2 ">
            <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 className="text-2xl font-bold text-md mb-6">
                Secure Payment Processing
              </h3>
              <p className="text-sm">
                At Royalties Buffet, we prioritize the security of your
                transactions. Our secure payment processing system ensures that
                your financial information is protected at all times. Whether
                you're paying for your meal in-person or ordering online, you
                can trust that your payment details are encrypted and
                safeguarded against unauthorized access. Enjoy the convenience
                of seamless and worry-free transactions, knowing that Royalties
                Buffet is dedicated to providing a secure payment experience for
                all our valued customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhyChooseus;