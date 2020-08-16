import React, { useState, useCallback } from "react";
import { useIntl } from "react-intl";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { useTheme } from "@material-ui/core/styles";
import { Box, Grid, Typography, Slider, RootRef } from "@material-ui/core";

const AvatarUploader = () => {
  const theme = useTheme();
  const intl = useIntl();

  const [image, setImage] = useState<string | File | null>(null);
  const [magnification, setMagnification] = useState<number>(3);

  const accept = ["image/*"];
  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    noClick: !!image,
    multiple: false,
  });
  const { ref, ...rootProps } = getRootProps();

  const handleChange = (_: any, newValue: number | number[]) => {
    setMagnification(newValue as number);
  };

  const showUploader = (isDragActive: boolean = false) => {
    var component = <> </>;
    if (image) {
      component = (
        <>
          <AvatarEditor
            width={256}
            height={256}
            border={0}
            borderRadius={128}
            scale={magnification}
            image={image ?? ""}
          />
          <Grid container spacing={2}>
            <Grid item>
              <Typography id="image-magnification-slider">
                {intl.formatMessage({ id: "user.avatar.magnification.name" })}
              </Typography>
            </Grid>
            <Grid item xs>
              <Slider
                step={0.1}
                max={5}
                value={magnification}
                valueLabelDisplay="auto"
                onChange={handleChange}
                aria-labelledby="image-magnification-slider"
              />
            </Grid>
          </Grid>
        </>
      );
    } else if (isDragActive) {
      component = <p> {intl.formatMessage({ id: "user.avatar.prompt.dropImage.name" })}&hellip; </p>;
    } else {
      component = <p> {intl.formatMessage({ id: "user.avatar.prompt.dragDropClick.name" })} </p>;
    }
    return component;
  };

  return (
    <RootRef rootRef={ref}>
      <Box border={1} {...rootProps} style={{ width: "100%", padding: theme.spacing(3) }}>
        <Typography variant="h5"> {intl.formatMessage({ id: "user.avatar.avatar.name" })} </Typography>
        <input {...getInputProps()} />
        {showUploader(isDragActive)}
      </Box>
    </RootRef>
  );
};

export default AvatarUploader;
