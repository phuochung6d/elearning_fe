import { useState, useEffect } from "react";
import { Button, List, Popover, Space } from "antd";
import Image from "next/image";
import dayjs from "dayjs";
import styles from '../../styles/components/cards/CourseCard.module.scss';

const CourseCard = ({
  course,
  index,
  disable = false,
}) => {
  const popoverBody = () => {
    // variables
    let totalDuration = 0;
    course?.lessons?.map(lesson => totalDuration += lesson?.duration);

    // functions
    const onAddWishlistClick = (e) => {
      e.stopPropagation();
    }

    return (
      <div
        className={`${styles.popover_container} ${styles.d_flex_col}`}
        onClick={(e) => e.stopPropagation()}
        style={{ width: '312px', minHeight: '290px', justifyContent: 'space-between' }}
      >
        <div>
          <p
            className={styles.popover_container_coursename}
          >
            {course?.name}
          </p>
          <p
            className={styles.popover_container_coursedate}
          >
            Cập nhật tháng <b>{dayjs(course?.updatedAt).month() + 1}/{dayjs(course?.updatedAt).year()}</b>
          </p>
          <Space direction='horizontal' split='|' style={{ alignItems: 'center' }}>
            <p
              className={styles.popover_container_courselessons}
            >
              <b>{course?.lessons?.length}</b> bài học
            </p>
            <p
              className={styles.popover_container_courseduration}
            >
              Thời lượng: <b>{totalDuration}s</b>
            </p>
          </Space>
          <p
            className={styles.popover_container_coursecategory}
          >
            <b>Phân loại: {course?.categoryInfo?.name}</b>
          </p>
          <div
            className={styles.popover_container_coursetags}
          >
            <b>Thẻ: </b>
            <Space direction='horizontal' split='|' style={{ alignItems: 'center', marginTop: '4px' }}>
              {course?.tags?.map((_, index) => <p key={index}>{_}</p>)}
            </Space>
          </div>
          <div
            className={styles.popover_container_coursecommitment}
          >
            <p><b>Bạn sẽ:</b></p>
            <ul style={{ lineHeight: '24px', marginTop: '4px' }}>
              {
                course?.goal?.map((_, index) => {
                  return (
                    <li key={index}>
                      {_}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <Button
          className={styles.popover_container_addtocart}
          type='primary'
          onClick={(e) => onAddWishlistClick(e)}
        >
          <b>Thêm vào wishlist</b>
        </Button>
      </div>
    )
  }

  return (
    <Popover
      trigger='hover'
      placement={index % 2 === 0 ? 'right' : 'left'}
      title={null}
      content={!disable ? popoverBody : null}
    >
      <div
        className={styles.container}
        style={{ width: '288px', height: '280px' }}
      >
        {/* header */}
        <div
          className={styles.container_header}
          style={{ height: '162px', width: '288px', border: '1px solid #d9d9d9' }}
        >
          <Image
            width={288}
            height={162}
            alt='courseCarousel'
            src={course?.image?.Location || '/no-photo.png'}
            style={{
              objectFit: course?.image?.Location ? 'cover' : 'scale-down',
              width: '-webkit-fill-available',
              height: '-webkit-fill-available'
            }}
          />
        </div>
        {/* body */}
        <div
          className={styles.container_body}
        >
          <p
            className={styles.container_body_coursename}
          >
            {course?.name}
          </p>
          <p
            className={styles.container_body_courseinstructor}
          >
            Instructor {course?.instructor?.name}
          </p>
          <p
            className={styles.container_body_courseprice}
          >
            {course?.paid
              ? `${course?.price} VNĐ`
              : 'Miễn phí'}
          </p>
        </div>
        {/* footer */}
        <div
          className={styles.container_footer}
        >

        </div>
      </div>
    </Popover>
  )
}

export default CourseCard