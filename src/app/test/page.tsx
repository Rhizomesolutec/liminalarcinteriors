import { createFeatureFlag } from "../../../flags";


export default async function Page() {

  const enabled = await createFeatureFlag("my_feature_flag")();

  return <div>myFeatureFlag is {enabled ? "on" : "off"}</div>

};