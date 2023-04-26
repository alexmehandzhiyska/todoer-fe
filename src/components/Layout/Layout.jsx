import Sidebar from '../Sidebar/Sidebar';

const Layout = (props) => {
    return (
        <div id="content-wrapper">
            <Sidebar></Sidebar>
            <main id="page-wrapper">{props.children}</main>
        </div>
    );
};

export default Layout;