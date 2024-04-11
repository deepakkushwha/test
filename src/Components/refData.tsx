import React, { useState } from 'react'
import icon1 from "../assets/images/icon1.png";
import { useNavigate } from 'react-router-dom';
import masterData from './masterData.json'; 

const RefData: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(masterData);

  
    // { name: 'VEHICLE IDV MASTER', path: 'VEHICLE-IDV-MASTER' },
    // { name: 'MANUFACTURER MASTER', path: 'MANUFACTURER-MASTER' },
    // { name: 'MOTOR COVER MASTER', path: 'MOTOR-COVER-MASTER' },
    // { name: 'PRODUCT CODE MASTER', path: 'PRODUCT-CODE-MASTER' },
    // { name: 'POLICY TYPE MASTER', path: 'POLICY-TYPE-MASTER' },
    // { name: 'EMPLOYEE USER MASTER', path: 'EMPLOYEE-USER-MASTER' },
    // { name: 'BROKER USER MASTER', path: 'BROKER-USER-MASTER' },
    // { name: 'DEALER USER MASTER', path: 'DEALER-USER-MASTER' },
    // { name: 'POLICY TYPE MASTER', path: 'POLICY-TYPE-MASTER' },
    // { name: 'CLIENT USER MASTER', path: 'CLIENT-USER-MASTER' },
    // { name: 'VOLUNTARY EXCESS MASTER', path: 'VOLUNTARY-EXCESS-MASTER' },
    // { name: 'SERVICE CHARGES MASTER', path: 'SERVICE-CHARGES-MASTER' },
    // { name: 'GC PC VEHICLE CAR MASTER', path:'GC-PC-VEHICLE-CAR-MASTER' },
    // { name: 'PINCODE MASTER', path: 'PINCODE-MASTER' },
    // { name: 'DISTRICT MASTER', path: 'DISTRICT-MASTER' },
    // { name: 'SPRVSRY SLTNG GROUP', path: 'SPRVSRY-SLTNG-GROUP' },
    // { name: 'STATE MASTER', path: 'STATE-MASTER' },
    // { name: 'GCCVWPC CODE MASTER', path: 'GCCVWPC-CODE-MASTER' },
    // { name: 'CITY MASTER', path: 'CITY-MASTER' },
    // { name: 'STATE DISTRICT MASTER', path: 'STATE-DISTRICT-MASTER' },

  return (
    <>
      {/* <section className="inner-breadcrumb">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active-crumb" aria-current="page">
                Master Data
              </li>
            </ul>
          </nav>
        </div>
      </section> */}

      <div className="inner-page-wrapper">
        <div className="container dashboard">
          <div className="policy-container">
            <h2 className="inner-title">Master Data</h2>
            <div className='col-md-12'>
                <div className="policies-row">
                  {data.map((item:any, index:any) => (

                    <div className="policies-col5 btn cursor-pointer" key={index} onClick={() => navigate(`/master-data/${item?.path}` , { state: { pageTitle: item?.name } })}>
                     
                      <img className='dash' src={icon1} alt="Policy Icon" />
                      <p className="">{item?.name}</p>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </>

  )
}
export default RefData