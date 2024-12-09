import styles from './Policies.module.scss'
import classNames from 'classnames/bind';
import PolicyItem from './PolicyItem';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
const cx = classNames.bind(styles);

function Policies() {
    const policies = 
    [
        {id: 1, question: "Tại sao tôi nên tham gia ShopWatch?", answer: "ShopWatch là chương trình Hội viên dành cho tất cả khách hàng của WatchStore, mang đến nhiều quyền lợi cho người tham gia. Hội viên ShopWatch sẽ được: Tích lũy chi tiêu để thăng hạng; Hưởng các quyền lợi theo hạng Hội viên: nhận quà tặng định kỳ, ưu đãi độc quyền; Hoàn tiền WatchCash cho mỗi đơn hàng; Đổi thưởng và nhiều quyền lợi khác sẽ được WatchStore cập nhật thường xuyên."}, 
{id: 2, question: "Đăng ký làm Hội viên ShopWatch có mất phí không? Cách đăng ký như thế nào?", answer: "Bạn có thể đăng ký ShopWatch hoàn toàn miễn phí bằng cách tạo Tài khoản tại website WatchStore.vn. Khi đăng ký thành công, bạn sẽ nhận ngay các quyền lợi của hạng Thành viên mới, đồng thời nhận voucher giảm giá 15% (tối đa 100.000 VND) cho lần mua sắm đầu tiên."}, 
{id: 3, question: "Chương trình ShopWatch cũ ngừng áp dụng khi nào? ShopWatch mới có nâng cấp gì khác?", answer: "Chương trình ShopWatch cũ ngừng áp dụng vào ngày 25/09/2023 để nâng cấp. Ở chương trình ShopWatch mới, bạn sẽ có trải nghiệm mua sắm tốt hơn với nhiều đặc quyền theo hạng Hội viên, tích lũy chi tiêu để thăng hạng, hoàn tiền WatchCash cho mỗi đơn hàng, đổi thưởng, nhận quà tặng định kỳ và nhiều ưu đãi độc quyền khác."}, 
{id: 4, question: "WatchCash có thời hạn không? Nếu có, thời hạn là bao lâu?", answer: "WatchCash được tích lũy sau mỗi đơn hàng và có giá trị trong 4 quý. Hạn sử dụng sẽ được cập nhật vào ngày đầu tiên của mỗi quý, diễn ra 4 lần mỗi năm vào các ngày 01/01, 01/04, 01/07 và 01/10."}, 
{id: 5, question: "Tôi có thể kết hợp ưu đãi theo Hạng Hội viên và ưu đãi khác không?", answer: "Khi mua sắm trên website WatchStore, ngoài các ưu đãi hiện có, bạn sẽ được áp dụng tự động ưu đãi theo hạng Hội viên tương ứng. Tuy nhiên, một số quyền lợi ShopWatch có thể thay đổi tùy vào chính sách của từng chương trình ưu đãi."}, 
{id: 6, question: "Hạng Hội viên khi nào sẽ được cập nhật? Bao lâu sẽ được cập nhật lại?", answer: "Hội viên sẽ thăng hạng ngay khi đạt mức chi tiêu của hạng tiếp theo. Hạng Hội viên sẽ được cập nhật vào ngày đầu tiên của mỗi quý, diễn ra 4 lần mỗi năm vào các ngày 01/01, 01/04, 01/07 và 01/10."}, 
{id: 7, question: "Làm sao để tích lũy WatchCash?", answer: "Sau khi đăng ký Hội viên ShopWatch, bạn sẽ nhận được hoàn tiền WatchCash từ mỗi giao dịch mua hàng trên website WatchStore dựa trên chi tiêu mỗi đơn hàng. Mỗi 1 đơn vị WatchCash có giá trị tương đương 1 VND (1 WatchCash = 1 VND)." }, 
{id: 8, question: "Tôi có thể dùng WatchCash để giảm giá trực tiếp không?", answer: "Có, bạn có thể sử dụng WatchCash để trừ trực tiếp vào giá trị đơn hàng khi mua sắm. Nếu số WatchCash bạn có ít hơn 50% giá trị đơn hàng, toàn bộ WatchCash sẽ được trừ. Nếu nhiều hơn 50% giá trị đơn hàng, số WatchCash bị trừ tối đa là 50% giá trị đơn hàng, phần còn lại được bảo lưu cho lần mua sau."}, 
{id: 9, question: "Đổi/trả hàng có ảnh hưởng đến WatchCash và hạng Hội viên không?", answer: "Có, WatchCash và hạng Hội viên chỉ được tính trên giá trị đơn hàng thành công. Việc đổi/trả hàng có thể ảnh hưởng đến giá trị cuối cùng khi hoàn tất đơn hàng."}, 
{id: 10, question: "Tôi mua hàng trên các sàn thương mại điện tử có được tích lũy chi tiêu ShopWatch không?", answer: "Hiện tại, chương trình ShopWatch chỉ dành cho khách hàng mua hàng tại website WatchStore, chưa áp dụng cho các đơn hàng trên các sàn thương mại điện tử."}

    ]
    return ( 
        <>
            <div className={cx('container')}>
            <Link to={'/user-profile'} className={cx('account-page__icon')}>
                    <BiArrowBack /> 
                </Link>
                <h1 className={cx('account-page__title')}>FAQ - Câu hỏi thường gặp</h1>
                <div>
                    {
                        policies.map((item, index) => {
                            return <>
                                <PolicyItem key={index} props={item}/>
                            </>
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Policies;