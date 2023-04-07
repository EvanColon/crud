import React, { useEffect, useContext, useRef, useState } from 'react';
import { DismissableAlert } from './DismissableAlert';
import "../../src/stylesheets/AdminPage.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Row, Col, Container, Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { myContext } from "../App";
import Cookie from "cookie";

const AdminPage = () => {
  
  const { cookies, setCookies } = useContext(myContext);
  const [authMode, setAuthMode] = useState("manageInventory")
  const [showAlert, setShowAlert] = useState(false);
  const [alertObj, setAlertObj] = useState({});
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inventory, setInventory] = useState([]);
  
  let modificationObj = useRef({});

  const changeAuthMode = (value) => {
    setShowAlert(false);
    setAuthMode(value);
  }

  useEffect(() => {
    
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .then(() => setIsLoaded(true));

    
  }, []);

  // const handleDelete = () => {
  //   let headers = new Headers();
  //   headers.append('username', username);
  //   fetch('http://localhost:3001/user/delete', {
  //     method: 'DELETE',
  //     credentials: 'include',
  //     headers: headers,
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setAlertObj(data);
  //       setShowAlert(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     }
  //     )
  // }
  const handleLogout = () => {
    fetch("http://localhost:3001/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then((data) => {
        setCookies(Cookie.parse(document.cookie));
      });
  };
  const handleDeleteItem = () => {
    let headers = new Headers();
    headers.append('id', name);
    fetch('http://localhost:3001/delete/item', {
      method: 'DELETE',
      credentials: 'include',
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAlertObj(data);
        setShowAlert(true);
      })
      .catch((error) => {
        console.log(error);
      }
      )
  }

  const handleEditItem = () => {
    console.log(modificationObj.current);
    let headers = new Headers();
    headers.append('itemName', itemName);
    headers.append('description', description);
    headers.append('quantity', quantity);
    headers.append('Content-Type', 'application/json');
    fetch('http://localhost:3001/movers', {
      method: 'PUT',
      credentials: 'include',
      headers: headers,
      body: JSON.stringify(modificationObj.current),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAlertObj(data);
        setShowAlert(true);

      })
      .catch((error) => {
        console.log(error);
      }
      )
      modificationObj.current = {};
  }
  const handleDisplayInventory = () => {
    items.map((item, i) => ( <>
      <Row className="ml-5 text-black text-center">
  <div className="showContainer" key={item.id} style={{ width: '80.5%' }}>
    <h4>Name: {item.itemName}</h4>
    <h4>Description: {item.description}</h4>
    <h4>Quantity: {item.quantity}</h4>
  </div>
  </Row>
    </>
))


  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  }

  if (authMode === "viewInventory" && isLoaded === true){
    return (
      <div className="Auth-form-container-admin">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Manage Items</h3>
            <Button variant="outline-primary" className="nav-buttons" onClick={() => handleLogout()}>Logout</Button>{' '}
              <DropdownButton id="dropdown-select-button" title="Select Action" variant="outline-primary">
                <Dropdown.Item onClick={() => changeAuthMode("viewInventory")}>View All Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("manageInventory")}>Manage My Items</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("deleteInventory")}>Delete Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("editInventory")}>Edit Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("createInventory")}>Create Inventory</Dropdown.Item>
              </DropdownButton>
              <>
              <Row className="ml-5 text-black text-center">
              {items.map((item, i) => (
            <div className="itemContainer" key={item.id} style={{ width: '80.5%' }}>
              {console.log(item)}
              <h4>created by user id: {item.userId}</h4>
              <h4>{item.itemName}</h4>
              <h4>{item.description}</h4>
              <h4>{item.quantity}</h4>
            </div>
          ))}
              </Row>
              </>
      
            {showAlert ? <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} /> : null}
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-outline-primary" onClick={() => handleDisplayInventory()}>
                View All Inventory
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  } else if (authMode === "manageInventory" && isLoaded === true){
    return (
      <div className="Auth-form-container-admin">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Manage Items</h3>
              <DropdownButton id="dropdown-select-button" title="Select Action" variant="outline-primary">
                <Dropdown.Item onClick={() => changeAuthMode("viewInventory")}>View All Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("manageInventory")}>Manage My Items</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("deleteInventory")}>Delete Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("editInventory")}>Edit Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("createInventory")}>Create Inventory</Dropdown.Item>
              </DropdownButton>
              <>
              <Nav className="nav-button-group justify-content-center">
                {cookies.id !== undefined && cookies.id > '0' ? <><Button variant="outline-primary" className="nav-buttons" onClick={() => navigate('/admin')}>Admin</Button>{' '}</> : null}
                <Button variant="outline-primary" className="nav-buttons" onClick={() => handleLogout()}>Logout</Button>{' '}
              </Nav>
    
              <Row className="ml-5 text-black text-center">
              {items.map((item, i) => (
            <div className="itemContainer" key={item.id} style={{ width: '80.5%' }}>
                {console.log(item)}
                {console.log('cookie', cookies.userId)}
              <h4>{`${item.userId}` === cookies.userId ? item.itemName : ""}</h4>
              <h4>{`${item.userId}` === cookies.userId ? item.description : ""}</h4>
              <h4>{`${item.userId}` === cookies.userId ? item.quantity : ""}</h4>
            </div>
          ))}
              </Row>
              </>
      
            {showAlert ? <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} /> : null}
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-outline-primary" onClick={() => 'handleDisplayInventory()'}>
                Manage My Inventory
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  } else if (authMode === "editInventory"){
    return (
      <div className="Auth-form-container-admin">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Manage Items</h3>
              <DropdownButton id="dropdown-select-button" title="Select Action" variant="outline-primary">
              <Dropdown.Item onClick={() => changeAuthMode("viewInventory")}>View All Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("manageInventory")}>Manage My Items</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("deleteInventory")}>Delete Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("editInventory")}>Edit Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("createInventory")}>Create Inventory</Dropdown.Item>
              </DropdownButton>
            <div className="form-group mt-3">
              <label className="input-label">Name of Item to Edit</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Previous Item Name"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Item Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Item Name"
                onChange={(event) => modificationObj.current["itemName"] = event.target.value}
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Description</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Description"
                onChange={(event) => modificationObj.current["description"] = event.target.value}
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Quantity</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Quantity"
                onChange={(event) => modificationObj.current["quantity"] = event.target.value}
              />
            </div>
            {showAlert ? <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} /> : null}
            <div className="d-grid gap-2 mt-3">
              <button type="text" className="btn btn-outline-primary" onClick={() => handleEditItem()}>
                Edit Items
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }else if(authMode === "deleteInventory"){
    return (
      <div className="Auth-form-container-admin">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Manage Items</h3>
              <DropdownButton id="dropdown-select-button" title="Select Action" variant="outline-primary">
              <Dropdown.Item onClick={() => changeAuthMode("viewInventory")}>View All Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("manageInventory")}>Manage My Items</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("deleteInventory")}>Delete Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("editInventory")}>Edit Inventory</Dropdown.Item>
                <Dropdown.Item onClick={() => changeAuthMode("createInventory")}>Create Inventory</Dropdown.Item>
              </DropdownButton>
            <div className="form-group mt-3">
              <label className="input-label">ID of Item to Delete</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="id"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            {showAlert ? <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} /> : null}
            <div className="d-grid gap-2 mt-3">
              <button type="text" className="btn btn-outline-primary" onClick={() => handleDeleteItem()}>
                Delete Item
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AdminPage