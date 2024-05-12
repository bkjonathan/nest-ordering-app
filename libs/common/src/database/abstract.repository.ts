import { Logger, NotFoundException } from '@nestjs/common';
import {
  Connection,
  FilterQuery,
  Model,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';

export abstract class AbstractRepository<TDcument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDcument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<TDcument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDcument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDcument;
  }

  async findOne(filterQuery: FilterQuery<TDcument>): Promise<TDcument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });
    if (!document) {
      this.logger.warn(`Document not found: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException('Document not found');
    }
    return document as unknown as TDcument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDcument>,
    update: UpdateQuery<TDcument>,
  ): Promise<TDcument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      new: true,
      lean: true,
    });
    if (!document) {
      this.logger.warn(`Document not found: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException('Document not found');
    }
    return document as unknown as TDcument;
  }
  async upsert(
    filterQuery: FilterQuery<TDcument>,
    document: Partial<TDcument>,
  ): Promise<TDcument> {
    return this.model.findOneAndUpdate(filterQuery, document, {
      upsert: true,
      new: true,
      lean: true,
    }) as unknown as TDcument;
  }

  async find(filterQuery: FilterQuery<TDcument>): Promise<TDcument[]> {
    return this.model.find(
      filterQuery,
      {},
      { lean: true },
    ) as unknown as TDcument[];
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
