export class MySQLDBStorage {
  async relationship<T>(list1: any, relationMethod: string, list2: any): Promise<T> {
    return list1[relationMethod](list2)
  }

  async count(model: any, filter?: any): Promise<number> {
    const quantity = await model.count(filter)

    return quantity
  }

  async find<T>(model: any, filter?: any): Promise<T> {
    const document = await model.findAll(filter)

    if (!document || !document[0]) return null

    const result = document.map((e) => e.get())

    return result as unknown as T
    // return document as unknown as T
  }

  async findById<T>(model: any, id: string, filter?: any): Promise<T> {
    const document = await model.findByPk(id, filter)

    if (!document) return null

    return document as unknown as T
  }

  async create<T>(model: any, data: any): Promise<T> {
    const document = await model.create(data)

    if (!document) return null

    return document as unknown as T
  }

  async update<T>(model: any, data: any, filter: any): Promise<T> {
    const document = await model.update(data, filter)

    if (!document) return null

    return document as unknown as T
  }

  async delete<T>(model: any, filter: any): Promise<T> {
    const document = await model.destroy(filter)

    if (!document) return null

    return document as unknown as T
  }
}
