import React from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
    makeStyles,
  } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: "20px 10px"
    },
    button: {
        marginTop: "10px",
        marginBottom: "10px"
    },
    preview: {
        padding: "10px",
        border: "2px dashed green"
    },
    button1: {
        height: "40px",
        width: "120px",
        color: "white",
        backgroundColor: "green",
        margin: "10px 10px",
        border: "1px solid grey",
        borderRadius: "5px",
        cursor: "pointer"
    },
    button2: {
        height: "40px",
        width: "120px",
        color: "black",
        backgroundColor: "white",
        margin: "10px 10px",
        border: "1px solid green",
        borderRadius: "5px",
        cursor: "pointer"
    },
    uploadIcon: {
        height: "150px",
        width: "150px",
    },
    alignCenter: {
        textAlign: "center"
    }
  }));

const UploadAvatar = (props) => {
    const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Slide direction="right" in={checked} {...({ timeout: 500 })}>
    <Grid container spacing={0} justifyContent='center'> 
    <Grid item xs={12} sm={6} md={6} className={classes.list}>
        <Typography variant="h5" component="h2" className={classes.alignCenter} color="primary">
           Upload Profile 
        </Typography>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {/* <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button> */}

            <Box className={classes.alignCenter}>
                <Button 
                    variant="outlined"
                    style={isDragging ? { border: "4px dashed red" } : null}
                    onClick={onImageUpload}
                    {...dragProps}
                    className={classes.button}
                >
                    <CloudUploadIcon color="secondary"  style={isDragging ? { color: "blue !important" } : null} className={classes.uploadIcon}/>
                </Button>

                &nbsp;
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                      <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}  className={classes.button1}>Change</button>
                      <button onClick={() => onImageRemove(index)}  className={classes.button2}>Remove</button>
                    </div>
                    <img src={image.data_url} className={classes.preview} alt="" width="90%" />
                  </div>
                ))}
            </Box>

          </div>
        )}
      </ImageUploading>  
    </Grid>
    </Grid>
    </Slide>
  );
}

export default UploadAvatar;