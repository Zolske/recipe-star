import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import { ImageUploadAsset } from "../../components/Asset";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

import ingredient_list_logo from "../../assets/images/example_ingredient_list.webp";
import method_list_logo from "../../assets/images/example_method_list.webp";

function PostCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    ingredients: "",
    content: "",
    image: "",
  });
  const { title, ingredients, content, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      // DELETE const { data } = await axiosReq.post("/posts/", formData);
      // DELETE history.push(`/posts/${data.id}`);
      const { data } = await axiosReq.post("/recipes/", formData);
      // history.push(`/recipes/${data.id}`);
            history.push(`/posts/${data.id}`);
      // history.push(`/`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
      <h3>Recipe Title</h3>
        <Form.Label><span className={appStyles.text_cursive}>Please, enter the title of your recipe.</span></Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
      <h3>What ingredients do you need:</h3>
        <Form.Label><span className={appStyles.text_cursive}>Please, list the ingredients, separated by a <strong>semicolon ;</strong> (e.g. 1 egg<strong>; </strong>0.5kg butter).</span></Form.Label>
        <img src={ingredient_list_logo} className="mb-1" alt="Example of how the listed ingredients will aper on post." width="160" title="Example of how the listed ingredients will aper on post."/>
        <Form.Control
          as="textarea"
          rows={6}
          name="ingredients"
          value={ingredients}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.ingredients?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
      <h3>How to make the dish:</h3>
        <Form.Label><span className={appStyles.text_cursive}>Please, separated every step by a <strong>semicolon ;</strong> (e.g. 1st instruction<strong>; </strong>2nd instruction<strong>; </strong>3rd instruction).</span></Form.Label>
        <img src={method_list_logo} className="mb-1" alt="Example of how the method will aper on post." width="160" title="Example of how the method will aper on post."/>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create new recipe page:</h2>
      <p>On this page you can upload new recipe.</p>
      <p className={appStyles.text_cursive}>Hire you can create a new recipe with an image, title, ingredients list and a method how to make it.</p>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <h3 className="text-center">Please, upload a image for your dish:</h3>
              <p className={appStyles.text_cursive}>Please, make sure that the image is <strong>NOT larger than 2MB</strong> and does <strong>NOT exceed 4096px</strong> in any direction.</p>
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <ImageUploadAsset
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;