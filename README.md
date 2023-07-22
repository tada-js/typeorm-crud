## TypeORM으로 CRUD 구현

- docker-compose.yml 설정
  - docker hub에 있는 postgres 이미지를 컨테이너로 가져와서 설치 및 실행
- `docker-compose up` 커맨드를 통해 모든 컨테이너를 생성 및 실행
- `AppDataSource.initialize`를 통해 postgres와 연결이 되었는지 확인
- 요청에 따른 CRUD 응답 처리

```ts
// 사용자 생성
app.post('/users', async (req, res) => {
  const user = await AppDataSource.getRepository(User).create(req.body);
  console.log(user);
  const results = await AppDataSource.getRepository(User).save(user);
  return res.send(results);
});

// 사용자 전체 조회
app.get('/users', async (req, res) => {
  const results = await AppDataSource.getRepository(User).find();
  res.json(results);
});

// 사용자의 id를 통해 특정 사용자 조회
app.get('/users/:id', async (req, res) => {
  const results = await AppDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });
  return res.json(results);
});

// 사용자 정보 업데이트
app.put('/users/:id', async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });

  AppDataSource.getRepository(User).merge(user, req.body);
  const result = await AppDataSource.getRepository(User).save(user);
  return res.send(result);
});

// 사용자 삭제
app.delete('/users/:id', async (req, res) => {
  const result = await AppDataSource.getRepository(User).delete(req.params.id);
  res.json(result);
});
```

- pgAdmin으로 확인
  ![](https://velog.velcdn.com/images/nu11/post/14b58753-6a48-4fc8-a83a-d7ec1c7ab89d/image.png)
