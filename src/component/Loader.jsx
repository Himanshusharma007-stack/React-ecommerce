import Lottie from "lottie-react";
// import groovyWalkAnimation from "./groovyWalk.json";
import loaderAnimation from "../assets/Loader.json";

export function Loader(props) {
  return <Lottie animationData={loaderAnimation} style={{ height: props.height || "67vh" }} />;
}
