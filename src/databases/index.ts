import { ATLAS_CLUSTER, ATLAS_DB, ATLAS_PASSWORD, ATLAS_USERNAME } from '@/config';
import { ServerApiVersion } from 'mongodb';

export const dbConnection = {
  uri: `mongodb+srv://${ATLAS_USERNAME}:${ATLAS_PASSWORD}@${ATLAS_CLUSTER}.nrqdewv.mongodb.net/${ATLAS_DB}?retryWrites=true&w=majority`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  },
};
