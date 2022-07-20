import * as C from "@chakra-ui/react";
import { HiDocument, HiOutlineDocumentAdd } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FormEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input, Loading } from "components";
import { uploadTransactions } from "services/upload";
import { useTransactions } from "context";

const DropzoneForm = () => {
  const [currentFiles, setCurrentFiles] = useState<File[]>([] as File[]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = C.useToast();
  const { handleChangeData } = useTransactions();

  const hasFiles = Boolean(currentFiles?.length);

  function onDrop(files: File[]) {
    setCurrentFiles(files);
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: [".txt"],
    multiple: false,
    onDrop,
  });

  const handleSubmitFiles = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    if (hasFiles) {
      formData.append("file", currentFiles[0]);

      try {
        const { data, status } = await uploadTransactions(formData);

        if (status === 200) {
          handleChangeData(data);
          toast({
            title: "Successfully uploaded",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        }
      } catch (err) {
        toast({
          title: "Error at uploading file",
          description: "Please try other file",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmitFiles}>
      <C.Box {...getRootProps()} w="100%">
        <Input name="file" {...getInputProps()} />
        <C.Text
          as="label"
          color="gray.200"
          fontSize={["14px", "18px"]}
          fontWeight="bold"
        >
          Upload your file
        </C.Text>
        <C.Center
          flexDirection="column"
          cursor="pointer"
          borderRadius="10px"
          border="1px dashed"
          borderColor="gray.200"
          p="16px 36px"
          mt="12px"
        >
          <C.Icon as={HiOutlineDocumentAdd} color="gray.200" fontSize="42px" />
          <C.Text
            mt="16px"
            as="span"
            fontSize="16px"
            lineHeight="150%"
            color="white"
          >
            Drop your file
            <C.Text as="span" ml="6px" color="blue.200" fontWeight="bold">
              here
            </C.Text>
          </C.Text>
        </C.Center>
      </C.Box>

      {hasFiles && (
        <C.Center flexDirection="column">
          {currentFiles.map((item) => {
            return (
              <C.Center mt="8px" key={item.name} mx="auto">
                <C.Icon
                  as={HiDocument}
                  color="primary.default"
                  fontSize="32px"
                />
                <C.Text
                  ml="8px"
                  mr="24px"
                  fontSize="16px"
                  lineHeight="150%"
                  color="black.default"
                >
                  {item.name}
                </C.Text>

                <C.Icon
                  as={AiOutlineCloseCircle}
                  onClick={() => setCurrentFiles([])}
                  ml="24px"
                  color="black.default"
                  cursor="pointer"
                  transition="color 0.2s ease-in-out"
                  _hover={{
                    color: "red.400",
                  }}
                  fontSize="24px"
                />
              </C.Center>
            );
          })}
          <C.Button
            isLoading={isLoading}
            mt="16px"
            variant="solid"
            type="submit"
            bg="blue.500"
            _hover={{ bg: "blue.700" }}
          >
            Upload
          </C.Button>
        </C.Center>
      )}
    </form>
  );
};

export default DropzoneForm;
