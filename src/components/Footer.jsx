import React from 'react';
import { helps, navItem } from '../lib/data';


const Footer = () => {
  return (
    <footer className="bg-white py-10  border-t border-gray-200">
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold">Funiro.</h3>
            <address className="not-italic text-sm mt-3 text-gray-600">
              400 University Drive Suite 200 Coral Gables, <br />
              FL 33134 USA
            </address>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold">Links</h3>
            <ul className="mt-3 text-sm text-gray-600 space-y-2">
              {navItem.map((item) => (
                <li key={item.id}>
                  <a href="#">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold">Help</h3>
            <ul className="mt-3 text-sm text-gray-500 space-y-2">
              {helps.map((item) => (
                <li key={item.id}>
                  <a href="#">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-bold">Newsletter</h3>
            <form className="mt-3 flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t pt-5 text-center text-sm text-gray-500">
          <p>2023 Funiro. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
