import { Tooltip } from "primereact/tooltip";

export default function MenuSidebar() {
  return (
    <div className="sidebar-menu-items">
      <div className="firstStep-menu">
        <ul>
        <span  className="custom-tooltip">
          <li>
            {/* <Tooltip target=".desktop-tooltip" position="right" /> */}
             <i
              className="pi pi-desktop"
              // data-pr-tooltip="Desktop"
            ></i>
          
          </li>
          </span>
          <li>
          
            <Tooltip target=".user-tooltip" position="right" />
            <i className="pi pi-user user-tooltip" data-pr-tooltip="User"></i>
          </li>
          <li>
            <Tooltip target=".box-tooltip" position="right" />
            <i
              className="pi pi-box box-tooltip"
              data-pr-tooltip="No Notification"
            ></i>
          </li>
          <li>
            <Tooltip target=".search-tooltip" position="right" />
            <i
              className="pi pi-search search-tooltip"
              data-pr-tooltip="Search"
            ></i>
          </li>
          <li>
            <Tooltip target=".file-edit-tooltip" position="right" />
            <i
              className="pi pi-file-edit file-edit-tooltip"
              data-pr-tooltip="File Edit"
            ></i>
          </li>
          <li>
            <Tooltip target=".phone-tooltip" position="right" />
            <i
              className="pi pi-phone phone-tooltip"
              data-pr-tooltip="Phone"
            ></i>
          </li>
          <li>
            <Tooltip target=".globe-tooltip" position="right" />
            <i
              className="pi pi-globe globe-tooltip"
              data-pr-tooltip="Globe"
            ></i>
          </li>
        </ul>
        <ul className="help-sideMenu-bar">
          <li>
            <Tooltip target=".comment-tooltip" position="right" />
            <i
              className="pi pi-comment comment-tooltip"
              data-pr-tooltip="Comment Here"
            ></i>
          </li>
        </ul>
      </div>

      {/* <div className="sidemenu-sublist" >
    <h6 className="sidemenu-title">Reports <i  className="pi pi-angle-double-left"></i></h6>
    <ul className="submenu-list-items">
        <li >Inventory Report</li>
        <li >Governance Report</li>
    </ul>
</div> */}

      {/* <div className="sidemenu-sublist" >
    <h6 className="sidemenu-title">Reference <i  className="pi pi-angle-double-left"></i></h6>
    <ul className="submenu-list-items">
        <li >Tenant</li>
        <li >Tenant Capacity
            Agreement</li>
        <li >Cloud Master</li>
    </ul>
</div> */}
    </div>
  );
}
