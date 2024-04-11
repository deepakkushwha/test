// import { t } from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";

const MasterDataBreadcrumb: React.FC<any> = ({
  pagetitle,
}) => {
  const navigate = useNavigate();

  return (
    <section className="inner-breadcrumb">
      {/* <div className="container">
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">{t('Home')}</a>
            </li>
            <li className="breadcrumb-item active-crumb" aria-current="page"
              onClick={() => navigate(`/dashboard`)}
            >
              {t('digital_product')}
              </li>
            <li
              className="breadcrumb-item active-crumb"
              aria-current="page"
              onClick={() => navigate(`/master-data-list`)}
            >
              {t('Master_Data')}
            </li>
            <li className="breadcrumb-item active-crumb" aria-current="page">
              {t(pagetitle)}
            </li>
          </ul>
        </nav>
      </div> */}
    </section>
  );
};

export default MasterDataBreadcrumb;
