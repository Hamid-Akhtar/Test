import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AddContact = ({ show, setShow, contact, setContact, onSubmit }) => {
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {contact?.id ? "Update Contact" : "Add Contact"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                required
                autoFocus
                value={contact.title}
                onChange={(e) =>
                  setContact({ ...contact, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="phone"
                value={contact.phone}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(!show)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onSubmit(contact)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddContact;
