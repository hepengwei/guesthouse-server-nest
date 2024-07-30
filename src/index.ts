import AppDataSource from '../ormconfig';
import Guesthouse from './modules/guesthouse/guesthouse.entity';
import Imgs from './modules/guesthouse/imgs.entity';

/**使用TypeORM CLI工具执行SQL语句，进行数据库的修改和迁移等工作
 * 该项目在第一次执行时会自动根据.entity实体文件创建表，第一次执行后可以执行该文件，执行后数据库中就有了所需的初始数据
 * 执行 npx ts-node src/index.ts 命令，可执行该文件
 */
AppDataSource.initialize()
  .then(async () => {
    const guesthouseList = [
      {
        name: '东城民宿',
        des: '东区 临近地铁',
        address: '东城区',
        price: 200,
        cityCode: '10001',
        showCount: 1,
        startTime: '2023-08-10 13:37:57',
        endTime: '2023-10-20 13:37:57',
      },
      {
        name: '西城民宿',
        des: '西区 临近地铁',
        address: '西城区',
        price: 100,
        cityCode: '10001',
        showCount: 1,
        startTime: '2023-08-10 13:37:57',
        endTime: '2023-11-10 13:37:57',
      },
      {
        name: '武昌民宿',
        des: '风景秀美适合放松身心',
        address: '洪山区',
        price: 300.34,
        cityCode: '10002',
        showCount: 1,
        startTime: '2023-08-10 13:37:57',
        endTime: '2023-11-10 13:37:57',
      },
      {
        name: '汉口民宿',
        des: '风景秀美适合放松身心',
        address: '江岸区',
        price: 300,
        cityCode: '10002',
        showCount: 1,
        startTime: '2023-08-10 13:37:57',
        endTime: '2023-11-10 13:37:57',
      },
      {
        name: '黄陂民宿',
        des: '风景秀美适合放松身心',
        address: '黄陂区',
        price: 86.98,
        cityCode: '10002',
        showCount: 1,
        startTime: '2023-08-10 13:37:57',
        endTime: '2024-11-10 13:37:57',
      },
      {
        name: '江夏民宿',
        des: '风景秀美适合放松身心',
        address: '江夏区',
        price: 86.98,
        cityCode: '10002',
        showCount: 1,
        startTime: '2023-08-10 13:37:57',
        endTime: '2024-11-10 13:37:57',
      },
      {
        name: '青山民宿',
        des: '风景秀美适合放松身心',
        address: '青山区',
        price: 545.79,
        cityCode: '10002',
        showCount: 1,
        startTime: '2023-08-10 13:37:57',
        endTime: '2024-11-10 13:37:57',
      },
      {
        name: '武昌民宿2',
        des: '风景秀美适合放松身心',
        address: '洪山区',
        price: 300,
        cityCode: '10002',
        showCount: 1,
        startTime: '2023-08-10 13:37:57',
        endTime: '2024-11-10 13:37:57',
      },
      {
        name: '汉口民宿2',
        des: '风景秀美适合放松身心',
        address: '江岸区',
        price: 300,
        cityCode: '10002',
        showCount: 1,
        startTime: '2023-08-10 13:37:57',
        endTime: '2024-11-10 13:37:57',
      },
      {
        name: '黄陂民宿2',
        des: '风景秀美适合放松身心',
        address: '黄陂区',
        price: 86.98,
        cityCode: '10002',
        showCount: 1,
        startTime: '2023-08-10 13:37:57',
        endTime: '2024-11-10 13:37:57',
      },
      {
        name: '江夏民宿2',
        des: '风景秀美适合放松身心',
        address: '江夏区',
        price: 86.98,
        cityCode: '10002',
        showCount: 1,
        startTime: '2024-02-10 13:37:57',
        endTime: '2024-11-10 13:37:57',
      },
      {
        name: '青山民宿2',
        des: '风景秀美适合放松身心',
        address: '青山区',
        price: 86.98,
        cityCode: '10002',
        showCount: 1,
        startTime: '2024-02-10 13:37:57',
        endTime: '2024-06-10 13:37:57',
      },
      {
        name: '西丽民宿',
        des: 'very good',
        address: '南山区',
        price: 800,
        cityCode: '10003',
        showCount: 1,
        startTime: '2023-02-10 13:37:57',
        endTime: '2024-06-10 13:37:57',
      },
    ];
    const imgList = [
      {
        url: '/static/images/flower.jpg',
        guesthouseId: 1,
      },
      {
        url: '/static/images/flower.jpg',
        guesthouseId: 1,
      },
      {
        url: '/static/images/flower.jpg',
        guesthouseId: 2,
      },
      {
        url: '/static/images/flower.jpg',
        guesthouseId: 3,
      },
      {
        url: '/static/images/flower.jpg',
        guesthouseId: 3,
      },
      {
        url: '/static/images/flower.jpg',
        guesthouseId: 4,
      },
    ];

    // 向民宿表中插入数据
    const guesthouseObjList = guesthouseList.map((item) =>
      AppDataSource.manager.create(Guesthouse, item),
    );
    AppDataSource.manager.save(guesthouseObjList);

    // 向民宿图片表中插入数据
    const imgObjList = imgList.map((item) => {
      const guesthouse = AppDataSource.manager.create(Guesthouse, {
        id: item.guesthouseId,
      });
      const params = { ...item, guesthouse };
      return AppDataSource.manager.create(Imgs, params);
    });
    AppDataSource.manager.save(imgObjList);

    console.log('数据库操作成功');
  })
  .catch((error) => console.log(error));
