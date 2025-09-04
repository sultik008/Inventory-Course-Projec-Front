import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar } from 'mdb-react-ui-kit';

export default function BreadCrumbs({paths}) {
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBBreadcrumb >
          {Array.isArray(paths) ?
          paths.map((path , i)=> {
            return(
          <MDBBreadcrumbItem active={i == paths.length ? true : false}>
            <a href={path.url}>{path.title}</a>
          </MDBBreadcrumbItem>
            )
          })
          : ''}
        </MDBBreadcrumb>
      </MDBContainer>
    </MDBNavbar>
  );
}