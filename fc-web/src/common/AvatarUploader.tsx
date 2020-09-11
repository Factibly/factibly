import React, { useState, useCallback } from "react";
import { useIntl } from "react-intl";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { Box, Grid, Typography, Slider, RootRef } from "@material-ui/core";

interface AvatarUploaderProps {
  avatarEditorRef: (editor: AvatarEditor, image: File | null) => void;
}

const accept = ["image/jpeg", "image/png"];

const AvatarUploader = ({ avatarEditorRef }: AvatarUploaderProps) => {
  const intl = useIntl();

  const [image, setImage] = useState<File | null>(null);
  const setEditorRef = (instance: AvatarEditor) => avatarEditorRef(instance, image);

  const [magnification, setMagnification] = useState<number>(3);
  const handleMagnificationChange = (_: React.ChangeEvent<{}>, newValue: number | number[]) =>
    setMagnification(newValue as number);

  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    noClick: !!image,
    multiple: false,
  });
  const { ref, ...rootProps } = getRootProps();

  const showUploader = (isDragActive: boolean = false, isDragReject: boolean = false) => {
    var Zone: React.ReactNode;
    if (image) {
      Zone = (
        <>
          <AvatarEditor
            ref={setEditorRef}
            image={image ?? ""}
            width={256}
            height={256}
            border={0}
            borderRadius={128}
            scale={magnification}
          />
          <Grid container spacing={2}>
            <Grid item>
              <Typography id="image-magnification-slider">
                {intl.formatMessage({ id: "user.avatar.magnification" })}
              </Typography>
            </Grid>
            <Grid item xs>
              <Slider
                step={0.1}
                max={5}
                value={magnification}
                valueLabelDisplay="auto"
                onChange={handleMagnificationChange}
                aria-labelledby="image-magnification-slider"
              />
            </Grid>
          </Grid>
        </>
      );
    } else {
      let Message: React.ReactNode = <> </>;
      if (isDragActive) {
        Message = intl.formatMessage({ id: "user.avatar.prompt.dropImage" });
      } else if (isDragReject) {
        Message = intl.formatMessage({ id: "user.avatar.prompt.mime.error" });
      } else {
        Message = (
          <>
            {intl.formatMessage({ id: "user.avatar.prompt.dragDropClick" })}
            <br />
            <em>{intl.formatMessage({ id: "user.avatar.prompt.mime.warning" })}</em>
          </>
        );
      }
      Zone = (
        <Typography component="div" variant="body2">
          {Message}
        </Typography>
      );
    }
    return Zone;
  };

  return (
    <RootRef rootRef={ref}>
      <Box width={1} p={3} border={1} {...rootProps}>
        <Typography component="div" variant="h6" gutterBottom>
          {intl.formatMessage({ id: "user.avatar" })}
        </Typography>
        <input {...getInputProps()} />
        {showUploader(isDragActive, isDragReject)}
      </Box>
    </RootRef>
  );
};

export default AvatarUploader;
