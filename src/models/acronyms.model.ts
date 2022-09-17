import { model, Schema, Document } from 'mongoose';
import { Acronym } from '@interfaces/acronyms.interface';
import { ATLAS_COLLECTION } from '@/config';

const acronymSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const acronymModel = model<Acronym & Document>(`${ATLAS_COLLECTION}`, acronymSchema);

export default acronymModel;
