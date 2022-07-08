import React, { useState } from "react";
import { toast } from "react-toastify";

import AddContact from "./AddContact";
import DeleteContact from "./DeleteContact";
import center from "../../centers.json";
import {get, post, update, deleteItem} from '../../api/api'

const initState = {
  title: "",
  phone: "",
};

const ContactList = () => {
  const [contact, setContact] = useState(initState);
  const [contactList, setContactList] = useState([]);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(10);
  const [id,setId] = useState(0)

  const handleSubmit = (data) => {
    if (data._id !== undefined) {
      if (data.title.trim() !== "") {
        update(`updateCenter/${data._id}`, data).then(res=>{
          setContactList((contactList) =>
            contactList.map((list) => {
              return data._id === list._id ? data : list;
          })
        );
        setShow(false);
        toast.success(res.data)
        })
        
      } else {
        toast("Title is required");
      }
    } else {
      if (data.title.trim() !== "") {
        post(`addCenter`, data).then(res=>{
          setContactList(res.data)
          setShow(false);
          toast.success("Successfully Created")

        }).catch(err=>{
          toast.error(err)
        })
        
      } else {
        toast.warning("Title is required ");
      }
    }
  };
const handleDelete=()=>{
  deleteItem(`deleteCenter/${id}`).then(res=>{
    setOpen(false);
    setContactList(contactList=>contactList.filter(item=>item._id!==id))
    toast.success("Successfully Deleted")
  })
}
  React.useEffect(() => {
     get("getCenters").then(res=>{
      setContactList(res.data)
      
    }).catch(err=>{
      toast.error(err)
    })
   
  }, []);
  
  return (
    <>
      {" "}
      <div className="wrapper mt-4">
        <div className="container">
          <h1 className="display-1 text-center mb-4">Contacts</h1>
          <div className="wrapper mt-4">
            <div className="container">
              <div className="row mx-4 justify-content-center">
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <div className="float-end mb-3">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      data-toggle="modal"
                      data-target="#AddnewModal"
                      onClick={() => {
                        setContact(initState);
                        setShow(true);
                      }}
                    >
                      <i className="fa fa-plus mr-2" aria-hidden="true" />
                      Add New
                    </button>
                  </div>
                </div>
              </div>
              {contactList.slice(0, items).map((item, index) => {
                return (
                  <>
                      <div className="row mx-4 m-5 justify-content-center moreBox">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                          <div className="card hvr-grow">
                            <div className="card-body">
                              <div className="row mx-4 justify-content-center">
                                <div className="col-lg-8 col-md-12 col-sm-12">
                                  <div className="text-center">
                                    {item.title && (
                                      <h3 style={{overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis"}}>
                                        <i
                                          className="fa fa-address-card mr-2"
                                          aria-hidden="true"
                                        />{" "}
                                        {item.title}
                                      </h3>
                                    )}
                                    <hr />
                                    {item.phone && (
                                      <p>
                                        <i
                                          className="fa fa-mobile mr-1"
                                          aria-hidden="true"
                                        />{" "}
                                        {item.phone}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-sm-12">
                                  <div className="d-grid gap-2 justify-content-md-end">
                                    <div>
                                      <button
                                        className="btn btn-info"
                                        style={{ padding: "0.375rem 1.2rem" }}
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                        onClick={() => {
                                          setContact(
                                            item,
                                          );
                                          setShow(true);
                                        }}
                                      >
                                        <i
                                          className="fa fa-pencil-square-o mr-1"
                                          aria-hidden="true"
                                        />
                                        Edit
                                      </button>
                                    </div>
                                    <div className="mt-1">
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => {setId(item._id); setOpen(true)}}
                                      >
                                        <i
                                          className="fa fa-trash mr-1"
                                          aria-hidden="true"
                                        />
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                  </>
                );
              })}

              {contactList.length > items && (
                <div className="row mx-4 mt-4 mb-5 mb text-center">
                  <div
                    className="col-lg-12 col-md-12 col-sm-12"
                    id="loadMore"
                    onClick={() => setItems(items + 10)}
                  >
                    <div className="text-dark load-more">
                      <strong>Load More</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddContact
        show={show}
        setShow={setShow}
        contact={contact}
        setContact={setContact}
        onSubmit={handleSubmit}
      />
      <DeleteContact open={open} setOpen={setOpen} onDelete={handleDelete} />
    </>
  );
};

export default ContactList;
