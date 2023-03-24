import { Editor as EditorProp, FloatingMenu } from "@tiptap/react";
import { useRef } from "react";
import { clsnm } from "utils/clsnm";
import { Web3Storage } from "web3.storage";

type Props = {
  editor: EditorProp;
};

export const FloatingMenuEditor = ({ editor }: Props) => {
  const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBEOGJBZTQxNzdiOTA4NzQwNThkMWJEODgzMTI3ZTllRkRiM2RDNGIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk2NjA4MjM5NTcsIm5hbWUiOiJwb2x5bm90ZSJ9.2iMv6-3ZxYxlqR4efJLsD06BeLEegZ0nKKRe2FvXPmc",
  });

  const imageInput = useRef<HTMLInputElement>(null);

  const selectFile = async () => {
    if (
      !imageInput.current ||
      imageInput.current.files === null ||
      !(imageInput.current.files.length === 1)
    )
      return;
    const fileMb = imageInput.current?.files[0].size / 1024 ** 2;
    if (fileMb > 2) {
      console.log("More than 2 MB!");
      return;
    }
    try {
      const fileName: string = imageInput.current?.files[0]?.name;
      const extention = fileName.split(".").pop();
      console.log(extention);
      if (
        extention === "png" ||
        extention === "jpg" ||
        extention === "jpeg" ||
        extention === "svg" ||
        extention === "pdf"
      ) {
        const urlRoot: string = "https://dweb.link/ipfs/";
        const rootCid = await client.put(imageInput.current?.files);
        const url: string = urlRoot + rootCid.toString() + "/" + fileName;
        editor.chain().focus().setImage({ src: url }).run();
      } else {
        console.log("buradayim");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <FloatingMenu
      className={clsnm("floating-menu bg-DARK_PURPLE")}
      tippyOptions={{ duration: 100 }}
      editor={editor}
    >
      <div className="flex flex-col p-1 items-center">
        <div className="flex space-x-3">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            H3
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            H4
          </button>
        </div>
        <div className="flex mt-1 space-x-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            Ordered List
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            Line
          </button>
        </div>
        <div className="flex mt-1 space-x-1">
          <input
            type="file"
            ref={imageInput}
            className="hidden"
            onChange={selectFile}
          />
          <button
            onClick={() => {
              if (!imageInput.current) return;
              imageInput.current.click();
              console.log("ehre");
            }}
          >
            Image
          </button>
        </div>
      </div>
    </FloatingMenu>
  );
};
