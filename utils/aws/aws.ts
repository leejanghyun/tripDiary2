// s3 접근하기 위해 불러옴
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
// presigned url 이용하기 위해 불러옴

const awsAccessKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESS_KEY || ''
const awsSecretKey = process.env.NEXT_PUBLIC_AWS_BUCKET_ACCESS_SECRET || ''
export const awsS3Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
const awsS3BucketRegion = 'ap-northeast-2'

// s3 클라이언트 연결
const s3 = new S3Client({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
  region: awsS3BucketRegion,
})

// file signedUrl 가져오기
export async function getFile(fileName: string) {
  try {
    const params = {
      Bucket: awsS3Bucket,
      Key: fileName,
    }
    const command = new GetObjectCommand(params)
    const data = await s3.send(command)
    return data.Body
  } catch (error) {
    return null
  }
}

// 파일 업로드
export async function uploadFile(fileBuffer: string, fileName: string, mimetype: string) {
  const uploadParams = {
    Bucket: awsS3Bucket,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimetype,
  }

  const res = await s3.send(new PutObjectCommand(uploadParams))
  return res.$metadata.httpStatusCode
}

// 파일 삭제
export async function deleteFile(fileName: string) {
  const uploadParams = {
    Bucket: awsS3Bucket,
    Key: fileName,
  }

  const res = await s3.send(new DeleteObjectCommand(uploadParams))
  return res.$metadata.httpStatusCode
}
