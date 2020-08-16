import React, { useState, useCallback } from "react";
import { useIntl } from "react-intl";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { useTheme } from "@material-ui/core/styles";
import { Box, Grid, Typography, Slider, RootRef } from "@material-ui/core";

interface AvatarUploaderProps {
  avatarEditorRef: (editor: any, image: File | null) => void;
}

const accept = ["image/jpeg", "image/png"];

const AvatarUploader = ({ avatarEditorRef }: AvatarUploaderProps) => {
  const theme = useTheme();
  const intl = useIntl();

  const [image, setImage] = useState<File | null>(null);
  const setEditorRef = (event: any) => avatarEditorRef(event, image);

  const [magnification, setMagnification] = useState<number>(3);
  const handleMagnificationChange = (_: any, newValue: number | number[]) => setMagnification(newValue as number);

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
    var Zone = <> </>;
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
    } else if (isDragActive) {
      Zone = <p> {intl.formatMessage({ id: "user.avatar.prompt.dropImage" })}&hellip; </p>;
    } else if (isDragReject) {
      Zone = <p> {intl.formatMessage({ id: "user.avatar.prompt.mime.notSupported" })} </p>;
    } else {
      Zone = (
        <p>
          {intl.formatMessage({ id: "user.avatar.prompt.dragDropClick" })} <br />
          <em> {intl.formatMessage({ id: "user.avatar.prompt.mime.onlyAccept" })} </em>
        </p>
      );
    }
    return Zone;
  };

  return (
    <RootRef rootRef={ref}>
      <Box border={1} {...rootProps} style={{ width: "100%", padding: theme.spacing(3) }}>
        <Typography variant="h5"> {intl.formatMessage({ id: "user.avatar" })} </Typography>
        <input {...getInputProps()} />
        {showUploader(isDragActive, isDragReject)}
      </Box>
    </RootRef>
  );
};

export default AvatarUploader;
