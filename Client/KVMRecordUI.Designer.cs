namespace Keyroll
{
    partial class KVMRecordUI
    {
        /// <summary> 
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 组件设计器生成的代码

        /// <summary> 
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.TxtName = new Sartrey.UI.WinForms.InputTextUI();
            this.label1 = new System.Windows.Forms.Label();
            this.TbxValue = new System.Windows.Forms.TextBox();
            this.BtnUpdate = new System.Windows.Forms.Button();
            this.BtnCopy = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // TxtName
            // 
            this.TxtName.BackColor = System.Drawing.Color.Transparent;
            this.TxtName.Dock = System.Windows.Forms.DockStyle.Top;
            this.TxtName.InputText = "";
            this.TxtName.LabelText = "Name";
            this.TxtName.LabelWidth = 0;
            this.TxtName.Location = new System.Drawing.Point(10, 10);
            this.TxtName.Name = "TxtName";
            this.TxtName.OldText = "";
            this.TxtName.Padding = new System.Windows.Forms.Padding(3);
            this.TxtName.PasswordText = '\0';
            this.TxtName.Size = new System.Drawing.Size(280, 27);
            this.TxtName.TabIndex = 0;
            // 
            // label1
            // 
            this.label1.Dock = System.Windows.Forms.DockStyle.Top;
            this.label1.Location = new System.Drawing.Point(10, 37);
            this.label1.Name = "label1";
            this.label1.Padding = new System.Windows.Forms.Padding(3, 0, 0, 0);
            this.label1.Size = new System.Drawing.Size(280, 23);
            this.label1.TabIndex = 1;
            this.label1.Text = "Value";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // TbxValue
            // 
            this.TbxValue.Dock = System.Windows.Forms.DockStyle.Top;
            this.TbxValue.Location = new System.Drawing.Point(10, 60);
            this.TbxValue.Multiline = true;
            this.TbxValue.Name = "TbxValue";
            this.TbxValue.Size = new System.Drawing.Size(280, 100);
            this.TbxValue.TabIndex = 2;
            // 
            // BtnUpdate
            // 
            this.BtnUpdate.Dock = System.Windows.Forms.DockStyle.Top;
            this.BtnUpdate.Location = new System.Drawing.Point(10, 160);
            this.BtnUpdate.Name = "BtnUpdate";
            this.BtnUpdate.Size = new System.Drawing.Size(280, 30);
            this.BtnUpdate.TabIndex = 3;
            this.BtnUpdate.Text = "Update";
            this.BtnUpdate.UseVisualStyleBackColor = true;
            // 
            // BtnCopy
            // 
            this.BtnCopy.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.BtnCopy.Location = new System.Drawing.Point(10, 360);
            this.BtnCopy.Name = "BtnCopy";
            this.BtnCopy.Size = new System.Drawing.Size(280, 30);
            this.BtnCopy.TabIndex = 4;
            this.BtnCopy.Text = "Copy to clipboard";
            this.BtnCopy.UseVisualStyleBackColor = true;
            // 
            // KVMRecordUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.BtnCopy);
            this.Controls.Add(this.BtnUpdate);
            this.Controls.Add(this.TbxValue);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.TxtName);
            this.Name = "KVMRecordUI";
            this.Padding = new System.Windows.Forms.Padding(10);
            this.Size = new System.Drawing.Size(300, 400);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Sartrey.UI.WinForms.InputTextUI TxtName;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox TbxValue;
        private System.Windows.Forms.Button BtnUpdate;
        private System.Windows.Forms.Button BtnCopy;
    }
}
