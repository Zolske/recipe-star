import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    like_id,
    title,
    ingredients,
    content,
    image,
    updated_at,
    setPosts,
  } = props;

  const ingredientsArray = ingredients ? ingredients.split(";") : ['no ingredients listed'];
  const contentArray = content ? content.split(";") : ['no method written'];

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      // await axiosRes.delete(`/posts/${id}/`);
      await axiosRes.delete(`/recipes/${id}/`);
      // history.goBack();
            history.push(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { recipe: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        {title && <Card.Title className={styles.recipe_title}>{title}</Card.Title>}
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <span className={styles.cursive_explanation}>posted by</span>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span className={styles.cursive_explanation}>updated on&nbsp;</span>
            <span>{updated_at}</span>
            {/* {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )} */}
            {is_owner && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        <hr></hr>
        <details><summary className={styles.summary_title}>ingredients list:</summary>
            <ul className={styles.ingredients_list}>
              {ingredientsArray.map((ingredient) => {
                return <li key={ingredient}>{ingredient}</li>
              })}
            </ul>
        </details>
        <hr></hr>
        <details><summary className={styles.summary_title}>cooking instructions:</summary>
          <ol className={styles.method_list}>
          {contentArray.map((content) => {
                return <div key={content}>
                  <li >{content}</li>
                  <div className={styles.icon_star}></div>
                  </div>
              })}
          </ol>
        </details>
        <hr></hr>
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {/* {likes_count} not working bring back later ?*/}
          <Link to={`/posts/${id}`}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Write a comment!</Tooltip>}
            >
              <i className="far fa-comments" />
            </OverlayTrigger>
          </Link>
          {/* {comments_count} not working bring back later ?*/}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;

// Make the pie dough:
// If you are making the pie crust from scratch, make the pie dough at least an hour in advance of making the pie. To make the dough, put the flour, sugar, and salt in a food processor and pulse a couple of times to blend.

// Add half of the butter and pulse several times. Add the rest of the butter and pulse several more times, until the butter pieces are not bigger than the size of a pea.

// Add 2 tablespoons of ice water and pulse a couple of times. Add another tablespoon, and maybe just a teaspoon more if needed, and pulse, just enough so that the dough holds together when you pinch it with your fingers.

// Empty the food processor bowl onto a clean surface and gather the dough into your hands and form a ball. Flatten to a smooth disk about 6 inches wide. Wrap tightly in plastic wrap and chill for 1 hour.;
// Bake the sweet potatoes:
// Pierce the sweet potatoes with the tines of a fork in several places.

// Put on a foil lined baking sheet and bake in a 350°F oven for 1 hour, or until cooked through and soft.;
// Roll out the pie dough, line pie dish, freeze:
// Remove the dough disk from the refrigerator and let sit for 5 to 10 minutes before rolling it out. Place it on a clean, lightly floured surface. Roll out the dough into a 14-inch round, large enough for a 9-inch pie plate.

// Place on dough on and in the pie dish, turn the edges under and crimp the edges. Poke the bottom of the crust a few times with tines of a fork.

// Place into the freezer to chill.;
// Mash the cooked sweet potatoes:
// When the cooked sweet potatoes are cool enough to handle, scoop out the flesh into a bowl. Mash with a potato masher. You should have 2 cups of sweet potato purée.;
// Beat eggs with sugars, spices, bourbon, sweetened condensed milk:
// In a separate large bowl, beat the eggs. Whisk in the butter, brown sugar, white sugar, cinnamon, nutmeg, ginger, vanilla extract, bourbon whisky (if using), and sweetened condensed milk.;
// Combine egg mixture with mashed sweet potatoes, pour into pie shell:
// Whisk together the egg sugar mixture with the mashed sweet potato until smooth. Pour into the frozen, unbaked pie shell. Smooth surface so that it is even.;
// Bake:
// Bake at 350°F for one hour or until the filling has set. Remove from oven and let sit to cool down for 30 minutes or so..


