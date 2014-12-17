using System.Xml.Linq;

namespace Keyroll.KVM
{
    public class Record
    {
        private string _Key 
            = null;
        private string _Value
            = null;

        public string Key
        {
            get { return _Key; }
            set { _Key = value; }
        }

        public string Value
        {
            get { return _Value; }
            set { _Value = value; }
        }

        public Record() 
        {
        }

        public static Record Parse(XElement xml) 
        {
            var record = new Record();
            record._Key = xml.Attribute("key").Value;
            record._Value = xml.Value;
            return record;
        }

        public XElement ToXML() 
        {
            var xml = new XElement("record", 
                new XAttribute("key", Key),
                Value);
            return xml;
        }
    }
}
