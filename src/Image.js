import React, { useRef } from "react";

function Image(props) {
  const { src, fallback } = props;
  const imageRef = useRef(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    imageRef.current = true;
    start();
    return () => {
      imageRef.current = false;
    };
  });

  async function start() {
    if (!src || !fallback) {
      const errorMessage = "`src` & `fallback` must be provided";
      setError(errorMessage);
      return;
    }
    tryLoadImage();
  }

  async function tryLoadImage() {
    try {
      await loadImage();
      if (imageRef.current) {
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }

  async function loadImage() {
    const img = imageRef.current;
    if (!img) {
      return;
    }

    return new Promise((resolve, reject) => {
      const onResolve = async () => {
        if (img.decode !== undefined) {
          try {
            await img.decode();
          } catch (error) {
            console.error(
              "An Error occurred while trying to decode an image",
              error
            );
          }
        }
        resolve();
      };

      const onReject = () => {
        reject(
          new Error("An Error occurred while trying to download an image")
        );
      };

      if (img.complete) {
        onResolve();
      } else {
        img.onload = onResolve;
      }
      img.onerror = onReject;
    });
  }

  if (loading) {
    return fallback;
  } else if (error) {
    return <span>ERROR</span>;
  } else if (src) {
    return (
      <>
        <img alt="" ref={imageRef} decoding="async" src={props.src} />
      </>
    );
  } else return null;
}

export default Image;
