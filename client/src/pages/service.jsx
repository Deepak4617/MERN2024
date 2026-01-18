import { Card } from 'flowbite-react'
import { useCustomDispatch } from '../hooks';

import { useAuthSelector } from '../services/selectors/authSelector';
import { useEffect } from 'react';

import getServicesData from '../services/api/service/serviceData';

const Service = () => {
  const dispatch = useCustomDispatch();
  const { getServicesDataResponse } = useAuthSelector();
  const services = getServicesDataResponse?.data?.data ?? [];

  useEffect(() => {
    dispatch(getServicesData())
  }, [dispatch])

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 via-purple-700 min-h-screen p-10">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-3xl font-bold text-white mb-6">Our Services</h3>

          {/* 2. Loading State Handling */}
          {getServicesDataResponse?.loading ? (
            <p className="text-white text-center">Loading services...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 3. Correct Mapping: Check if services exists before map */}
              {services.length > 0 ? (
                services.map((item) => (
                  <Card
                    key={item._id}
                    className="p-4 bg-purple-300 hover:from-green-500 hover:to-blue-600 shadow-lg transform transition duration-300 hover:scale-105"
                  >
                    <h4 className="text-xl font-bold text-purple-700">{item.service}</h4>
                    <p className="text-gray-600 italic text-sm">{item.provider}</p>
                    <p className="text-gray-800 mt-2">{item.description}</p>
                    <div className="mt-4 font-semibold text-green-600">
                      Price: {item.price}
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-white">No services found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      );
    </>
  )
}

export default Service
