import React, { useEffect, useContext, useRef, useState } from "react";
import { myContext } from "../App";
import { DismissableAlert } from "./DismissableAlert";
import "../../src/stylesheets/AdminPage.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Row, Col, Button, Navbar, Nav} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EasyEdit, { Types } from "react-easy-edit";
import Cookie from "cookie";

const AdminPage = () => {
  const { cookies, setCookies } = useContext(myContext);
  const [authMode, setAuthMode] = useState("manageInventory");
  const [showAlert, setShowAlert] = useState(false);
  const [alertObj, setAlertObj] = useState({});
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemId, setItemId] = useState("");
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inventory, setInventory] = useState([]);

  let modificationObj = useRef({});
  const saveName = (value) => {
    setItemName(value);
    alert(value);
  };
  const saveId = (value) => {
    setItemId(value);
    alert(value);
  };

  const saveDescription = (value) => {
    setDescription(value);
    alert(value);
  };

  const saveQuantity = (value) => {
    setQuantity(value);
    alert(value);
  };

  const cancel = () => {
    alert("Cancelled");
  };

  const changeAuthMode = (value) => {
    setShowAlert(false);
    setAuthMode(value);
  };

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .then(() => setIsLoaded(true));
  }, [inventory]);

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
        navigate("/");
      });
  };
  const handleDeleteItem = async () => {
    let headers = new Headers();
    headers.append("id", itemId);
    await fetch("http://localhost:3001/delete/item", {
      method: "DELETE",
      credentials: "include",
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
        setInventory.push(1);
      })
      .catch((error) => {
        console.log(error);
      });
    modificationObj.current = {};
  };
  const handleCreateItem = async () => {
    let headers = new Headers();
    headers.append("userId", cookies.userId);
    headers.append("itemName", itemName);
    headers.append("description", description);
    headers.append("quantity", quantity);
    await fetch("http://localhost:3001/create/item", {
      method: "POST",
      credentials: "include",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (!data.error) {
          setAlertObj(data);
          setShowAlert(true);
          setInventory.push(1);
        } else {
          setAlertObj(data);
          setShowAlert(true);
          setInventory.push(1);
        }
        return;
      })
      .catch((error) => {
        console.log(error);
      });
    modificationObj.current = {};
  };
  const editName = () => {
    console.log(modificationObj.current);
    let headers = new Headers();
    headers.append("itemName", itemName);
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:3001/update/item", {
      method: "PATCH",
      credentials: "include",
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
        modificationObj.current = { data };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDisplayInventory = () => {
    items.map((item, i) => (
      <>
        <Row className="ml-5 text-black text-center">
          {items.map((item, i) => (
            <div
              className="itemContainer"
              key={item.id}
              style={{ width: "80.5%" }}
            >
              <EasyEdit
                type={Types.TEXT}
                //onSave={saveName}
                onCancel={cancel}
                saveButtonLabel="Save"
                cancelButtonLabel="Cancel"
                placeholder={
                  <div>
                    <h4>
                      {`${item.userId}` === cookies.userId ? item.id : ""}
                    </h4>
                    <h4>
                      {`${item.userId}` === cookies.userId ? item.itemName : ""}
                    </h4>
                    <h4>
                      {`${item.userId}` === cookies.userId
                        ? item.description
                        : ""}
                    </h4>
                    <h4>
                      {`${item.userId}` === cookies.userId ? item.quantity : ""}
                    </h4>
                  </div>
                }
                instructions="click the text to edit"
              />
            </div>
          ))}
        </Row>
      </>
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  if (authMode === "viewInventory" && isLoaded === true) {
    return (
      <div className="Auth-form-container-admin">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Manage Items</h3>
            <Button
              variant="outline-primary"
              className="nav-buttons"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>{" "}
            <DropdownButton
              id="dropdown-select-button"
              title="Select Action"
              variant="outline-primary"
            >
              <Dropdown.Item
                as="button"
                onClick={() => changeAuthMode("viewInventory")}
              >
                View All Inventory
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => changeAuthMode("manageInventory")}
              >
                Manage My Items
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => changeAuthMode("deleteInventory")}
              >
                Delete Inventory
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => changeAuthMode("editInventory")}
              >
                Edit Inventory
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => changeAuthMode("createInventory")}
              >
                Create Inventory
              </Dropdown.Item>
            </DropdownButton>
            <>
              <Row className="ml-5 text-black text-center">
                {items.map((item, i) => (
                  <div
                    className="itemContainer"
                    key={item.id}
                    style={{ width: "300.5%", height: "50.5%" }}
                  >
                  
                    --------------

                    <EasyEdit
                      type={Types.TEXT}
                      onSave={saveId}
                      onCancel={cancel}
                      saveButtonLabel="Save Me"
                      cancelButtonLabel="Cancel Me"
                      placeholder={item.id}
                    />
                    <EasyEdit
                      type={Types.TEXT}
                      onSave={editName}
                      onCancel={cancel}
                      saveButtonLabel="Save Me"
                      cancelButtonLabel="Cancel Me"
                      placeholder={item.itemName}
                    />
                    <EasyEdit
                      type={Types.TEXT}
                      onSave={saveDescription}
                      onCancel={cancel}
                      saveButtonLabel="Save Me"
                      cancelButtonLabel="Cancel Me"
                      placeholder={item.description}
                    />
                    <EasyEdit
                      type={Types.TEXT}
                      onSave={saveQuantity}
                      onCancel={cancel}
                      saveButtonLabel="Save Me"
                      cancelButtonLabel="Cancel Me"
                      placeholder={item.quantity}
                    />
                  </div>
                ))}
              </Row>
            </>
            {showAlert ? (
              <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} />
            ) : null}
            <div className="d-grid gap-2 mt-3">
            </div>
          </div>
        </form>
      </div>
    );
  } else if (authMode === "manageInventory" && isLoaded === true) {
    return (
      <div className="Auth-form-container-admin">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Manage Items</h3>
            <nav>
              <Row className="drop bg-secondary">
                <Col className="d-flex p-2">
                  <DropdownButton
                    className="button-64"
                    as={ButtonGroup}
                    id="dropdown-select-button"
                    title="Select Action"
                    variant="outline-primary"
                  >
                    <Dropdown.Item
                      as="button"
                      onClick={() => changeAuthMode("viewInventory")}
                    >
                      View All Inventory
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      onClick={() => changeAuthMode("manageInventory")}
                    >
                      Manage My Items
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      onClick={() => changeAuthMode("deleteInventory")}
                    >
                      Delete Inventory
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      onClick={() => changeAuthMode("editInventory")}
                    >
                      Edit Inventory
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      onClick={() => changeAuthMode("createInventory")}
                    >
                      Create Inventory
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              <>
                <Nav className="nav-button-group justify-content-center">
                  <Button
                    variant="outline-primary"
                    className="nav-buttons"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Button>{" "}
                </Nav>

                <Row className="ml-5 text-black text-center">
                  {items.map((item, i) => (
                    <div
                      className="itemContainer"
                      key={item.id}
                      style={{ width: "300.5%", height: "300.5%" }}
                    >
                      --------------
                      <EasyEdit
                        type={Types.TEXT}
                        onSave={saveId}
                        onCancel={cancel}
                        saveButtonLabel="Save Me"
                        cancelButtonLabel="Cancel Me"
                        placeholder={
                        `${item.userId}` === cookies.userId ? item.id : ""
                        }
                      />
                      <EasyEdit
                        type={Types.TEXT}
                        onSave={editName}
                        onCancel={cancel}
                        saveButtonLabel="Save Me"
                        cancelButtonLabel="Cancel Me"
                        onChange={(event) =>
                        (modificationObj.current["itemName"] =
                          event.target.value)
                        }
                        placeholder={
                          `${item.userId}` === cookies.userId
                            ? item.itemName
                            : ""
                        }
                      />
                      <EasyEdit
                        type={Types.TEXT}
                        onSave={saveDescription}
                        onCancel={cancel}
                        saveButtonLabel="Save Me"
                        cancelButtonLabel="Cancel Me"
                        onChange={(event) =>
                        (modificationObj.current["description"] =
                          event.target.value)
                        }
                        placeholder={
                          `${item.userId}` === cookies.userId
                            ? item.description
                            : ""
                        }
                      />
                      <EasyEdit
                        type={Types.TEXT}
                        onSave={saveQuantity}
                        onCancel={cancel}
                        saveButtonLabel="Save Me"
                        cancelButtonLabel="Cancel Me"
                        onChange={(event) =>
                        (modificationObj.current["quantity"] =
                          event.target.value)
                        }
                        placeholder={
                          `${item.userId}` === cookies.userId
                            ? item.quantity
                            : ""
                        }
                      />
                    </div>
                  ))}
                </Row>
              </>
            </nav>
            {showAlert ? (
              <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} />
            ) : null}
            <div className="d-grid gap-2 mt-3"></div>
          </div>
        </form>
      </div>
    );
  } else if (authMode === "createInventory") {
    return (
      <div className="Auth-form-container-admin">
      <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title text-primary">Manage Items</h3>
          <Button
            variant="outline-primary"
            className="nav-buttons"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>{" "}
          <DropdownButton
            id="dropdown-select-button"
            title="Select Action"
            variant="outline-primary"
          >
            <Dropdown.Item
              as="button"
              onClick={() => changeAuthMode("viewInventory")}
            >
              View All Inventory
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => changeAuthMode("manageInventory")}
            >
              Manage My Items
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => changeAuthMode("deleteInventory")}
            >
              Delete Inventory
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => changeAuthMode("editInventory")}
            >
              Edit Inventory
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => changeAuthMode("createInventory")}
            >
              Create Inventory
            </Dropdown.Item>
          </DropdownButton>
          <>
          <Row className="ml-5 text-black text-center">
            <div className="form-group mt-3">
              <label className="input-label">New Item Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Item Name"
                onChange={(event) => setItemName(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Description</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Description"
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Quantity</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Quantity"
                onChange={(event) => setQuantity(event.target.value)}
              />
            </div>
          </Row>
          </>
          {showAlert ? (
            <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} />
          ) : null}
          <div className="d-grid gap-2 mt-3">
            <button
              type="text"
              className="btn btn-outline-primary"
              onClick={() => {
                handleCreateItem();
                setAuthMode("manageInventory");
              }}
            >
              Create Item
            </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else if (authMode === "editInventory") {
    return (
      <div className="Auth-form-container-admin">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Manage Items</h3>
            <DropdownButton
              id="dropdown-select-button"
              title="Select Action"
              variant="outline-primary"
            >
              <Dropdown.Item as="button" onClick={() => changeAuthMode("viewInventory")}>
                View All Inventory
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => changeAuthMode("manageInventory")}>
                Manage My Items
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => changeAuthMode("deleteInventory")}>
                Delete Inventory
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => changeAuthMode("editInventory")}>
                Edit Inventory
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => changeAuthMode("createInventory")}>
                Create Inventory
              </Dropdown.Item>
            </DropdownButton>
            <div className="form-group mt-3">
              <label className="input-label">Id of Item to Edit</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Previous Item Name"
                onChange={(event) => modificationObj.current["id"] = event.target.value}
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Item Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Item Name"
                onChange={(event) =>
                  (modificationObj.current["itemName"] = event.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Description</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Description"
                onChange={(event) =>
                  (modificationObj.current["description"] = event.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Quantity</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Quantity"
                onChange={(event) =>
                  (modificationObj.current["quantity"] = event.target.value)
                }
              />
            </div>
            {showAlert ? (
              <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} />
            ) : null}
            <div className="d-grid gap-2 mt-3">
              <button
                type="text"
                className="btn btn-outline-primary"
                onClick={() => editName}
              >
                Edit Items
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else if (authMode === "deleteInventory") {
    return (
      <div className="Auth-form-container-admin">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Manage Items</h3>
            <DropdownButton
              id="dropdown-select-button"
              title="Select Action"
              variant="outline-primary"
            >
              <Dropdown.Item as="button" onClick={() => changeAuthMode("viewInventory")}>
                View All Inventory
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => changeAuthMode("manageInventory")}>
                Manage My Items
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => changeAuthMode("deleteInventory")}>
                Delete Inventory
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => changeAuthMode("editInventory")}>
                Edit Inventory
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => changeAuthMode("createInventory")}>
                Create Inventory
              </Dropdown.Item>
            </DropdownButton>

            <Row className="ml-5 text-black text-center">
              {items.map((item, i) => (
                <div
                  className="itemContainer"
                  key={item.id}
                  style={{ width: "80.5%" }}
                >
                  -------------
                  <EasyEdit
                    type={Types.TEXT}
                    onSave={saveId}
                    onCancel={cancel}
                    saveButtonLabel="Save Me"
                    cancelButtonLabel="Cancel Me"
                    placeholder={
                    `id: ${item.userId}` === cookies.userId ? `id: ${item.id}` : ""
                    }
                  />
                  <EasyEdit
                    type={Types.TEXT}
                    onSave={editName}
                    onCancel={cancel}
                    saveButtonLabel="Save Me"
                    cancelButtonLabel="Cancel Me"
                    onChange={(event) =>
                    (modificationObj.current["itemName"] =
                      event.target.value)
                    }
                    placeholder={
                      `${item.userId}` === cookies.userId
                        ? item.itemName
                        : ""
                    }
                  />
                  <EasyEdit
                    type={Types.TEXT}
                    onSave={saveDescription}
                    onCancel={cancel}
                    saveButtonLabel="Save Me"
                    cancelButtonLabel="Cancel Me"
                    onChange={(event) =>
                    (modificationObj.current["description"] =
                      event.target.value)
                    }
                    placeholder={
                      `${item.userId}` === cookies.userId
                        ? item.description
                        : ""
                    }
                  />
                  <EasyEdit
                    type={Types.TEXT}
                    onSave={saveQuantity}
                    onCancel={cancel}
                    saveButtonLabel="Save Me"
                    cancelButtonLabel="Cancel Me"
                    onChange={(event) =>
                    (modificationObj.current["quantity"] =
                      event.target.value)
                    }
                    placeholder={
                      `${item.userId}` === cookies.userId
                        ? item.quantity
                        : ""
                    }
                  />
                </div>
              ))}
            </Row>

            <div className="form-group mt-3">
              <label className="input-label">Id of Item to Delete</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="id"
                onChange={(event) => setItemId(event.target.value)}
              />


            </div>
            {showAlert ? (
              <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} />
            ) : null}
            <div className="d-grid gap-2 mt-3">
              <button
                type="text"
                className="btn btn-outline-primary"
                onClick={() => {
                  handleDeleteItem();
                  setAuthMode("manageInventory");
                }}
              >
                Delete Item
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default AdminPage;
