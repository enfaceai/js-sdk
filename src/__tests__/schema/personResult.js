import { Schema } from 'js-data';
import { TIME_UUID_PATTERN, TIME_UTC_PATTERN } from '../../../common/constants.js';
import {
  SOURCE_GROUP_NAME_MIN_LENGTH,
  SOURCE_GROUP_NAME_MAX_LENGTH,
  SOURCE_NAME_MIN_LENGTH,
  SOURCE_NAME_MAX_LENGTH,
} from '../../../models/constants.js';

const PersonResult = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Person',
  description: 'Person successfull processing result',
  type: 'object',
  properties: {
    person_id: {
      type: 'string',
      pattern: TIME_UUID_PATTERN,
    },
    list_id: {
      type: 'string',
      pattern: TIME_UUID_PATTERN,
    },
    created: {
      type: 'string',
      pattern: TIME_UTC_PATTERN,
    },
    person_source: {
      type: 'object',
      properties: {
        group_id: {
          type: 'string',
          pattern: TIME_UUID_PATTERN,
        },
        group_name: {
          type: 'string',
          minLength: SOURCE_GROUP_NAME_MIN_LENGTH,
          maxLength: SOURCE_GROUP_NAME_MAX_LENGTH,
        },
        source_id: {
          type: 'string',
          pattern: TIME_UUID_PATTERN,
        },
        source_name: {
          type: 'string',
          minLength: SOURCE_NAME_MIN_LENGTH,
          maxLength: SOURCE_NAME_MAX_LENGTH,
        },
      },
      required: ['group_id', 'group_name', 'source_id', 'source_name'],
    },
    image_url: {
      type: 'string',
      minLength: 10,
    },
    fields: {
      type: 'array',
      minItems: 0,
      maxItems: 2000000,
      uniqueItems: true,
      items: {
        type: 'string',
        minLength: 0,
        maxLength: 65535,
      },
    },
    features: {
      type: 'array',
      minItems: 0,
      maxItems: 2000000,
      uniqueItems: true,
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
          },
          version: {
            type: 'number',
            minimum: 1,
          },
          result: {
            anyOf: [
              {
                type: 'number',
              },
              {
                type: 'boolean',
              },
              {
                type: 'string',
              },
            ],
          },
          confidence: {
            type: 'string',
            minLength: 1,
            maxLength: 6,
          },
          spent: {
            type: 'number',
            minimum: 0,
            maximum: 50000,
          },
        },
        required: ['name', 'version', 'result', 'confidence', 'spent'],
      },
    },
    status: {
      type: 'string',
      enum: ['init', 'replaced'],
    },
    yaw: {
      type: 'number',
      minimum: -90,
      maximum: 90,
    },
    roll: {
      type: 'number',
      minimum: -180,
      maximum: 180,
    },
    pitch: {
      type: 'number',
      minimum: -90,
      maximum: 90,
    },
  },
  required: ['person_id', 'list_id', 'created', 'fields', 'group_id', 'source_id', 'image_url', 'features', 'status', 'yaw'],
};
export const personResultSchema = new Schema(PersonResult);
